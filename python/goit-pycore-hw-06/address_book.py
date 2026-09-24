from collections import UserDict
from typing import Iterable, Optional


class Field:
    """Base class for record fields."""

    def __init__(self, value: str) -> None:
        self._value: str = ""
        self.value = value

    def __str__(self) -> str:
        return str(self.value)

    def value(self) -> str:
        return self._value

    def value(self, value: str) -> None:
        self._value = value


class Name(Field):
    def value(self) -> str:
        return self._value

    def value(self, value: str) -> None:
        if not value or not value.strip():
            raise ValueError("Name cannot be empty.")
        self._value = value.strip()


class Phone(Field):
    def value(self) -> str:
        return self._value

    def value(self, value: str) -> None:
        digits = str(value).strip()
        if not digits.isdigit():
            raise ValueError("Phone number must contain digits only.")
        if len(digits) != 10:
            raise ValueError("Phone number must be exactly 10 digits long.")
        self._value = digits


class Record:
    def __init__(self, name: str, phones: Optional[Iterable[str]] = None) -> None:
        self.name = Name(name)
        self.phones: list[Phone] = []
        if phones:
            for phone in phones:
                self.add_phone(phone)

    def add_phone(self, phone: str) -> Phone:
        new_phone = Phone(phone)
        self.phones.append(new_phone)
        return new_phone

    def remove_phone(self, phone: str) -> Phone:
        target = self.find_phone(phone)
        if target is None:
            raise ValueError("Phone number not found.")
        self.phones.remove(target)
        return target

    def edit_phone(self, old_phone: str, new_phone: str) -> Phone:
        target = self.find_phone(old_phone)
        if target is None:
            raise ValueError("Phone number to edit not found.")
        target.value = Phone(new_phone).value
        return target

    def find_phone(self, phone: str) -> Optional[Phone]:
        for existing in self.phones:
            if existing.value == phone:
                return existing
        return None

    def __str__(self) -> str:
        phones_repr = "; ".join(phone.value for phone in self.phones) or "no phones"
        return f"Contact name: {self.name.value}, phones: {phones_repr}"


class AddressBook(UserDict):
    def add_record(self, record: Record) -> None:
        self.data[record.name.value] = record

    def find(self, name: str) -> Optional[Record]:
        return self.data.get(name)

    def delete(self, name: str) -> None:
        if name in self.data:
            del self.data[name]


if __name__ == "__main__":
    book = AddressBook()

    john_record = Record("John")
    john_record.add_phone("1234567890")
    john_record.add_phone("5555555555")
    book.add_record(john_record)

    jane_record = Record("Jane")
    jane_record.add_phone("9876543210")
    book.add_record(jane_record)

    for _, record in book.data.items():
        print(record)

    john = book.find("John")
    if john:
        john.edit_phone("1234567890", "1112223333")
        print(john)
        found_phone = john.find_phone("5555555555")
        if found_phone:
            print(f"{john.name.value}: {found_phone.value}")

    book.delete("Jane")
