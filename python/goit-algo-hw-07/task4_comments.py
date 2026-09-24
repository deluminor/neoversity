from typing import List


class Comment:
    def __init__(self, text: str, author: str) -> None:
        self.text = text
        self.author = author
        self.replies: List[Comment] = []
        self.is_deleted = False

    def add_reply(self, reply: "Comment") -> None:
        self.replies.append(reply)

    def remove_reply(self) -> None:
        self.text = "Цей коментар було видалено."
        self.is_deleted = True

    def display(self, indent: int = 0) -> None:
        indentation = " " * indent

        if self.is_deleted:
            print(f"{indentation}{self.text}")
        else:
            print(f"{indentation}{self.author}: {self.text}")

        for reply in self.replies:
            reply.display(indent + 4)

    def __str__(self) -> str:
        if self.is_deleted:
            return self.text
        return f"{self.author}: {self.text}"


if __name__ == "__main__":
    print("=== Test case from assignment ===\n")

    root_comment = Comment("Яка чудова книга!", "Бодя")
    reply1 = Comment("Книга повне розчарування :(", "Андрій")
    reply2 = Comment("Що в ній чудового?", "Марина")

    root_comment.add_reply(reply1)
    root_comment.add_reply(reply2)

    reply1_1 = Comment("Не книжка, а перевели купу паперу ні нащо...", "Сергій")
    reply1.add_reply(reply1_1)

    reply1.remove_reply()

    root_comment.display()

    print("\n\n=== Additional test: deeper hierarchy ===\n")

    article_comment = Comment("Чудова стаття про Python!", "Олександр")

    comment1 = Comment("Повністю згоден!", "Ірина")
    article_comment.add_reply(comment1)

    comment2 = Comment("А мені сподобалась більше стаття про JavaScript", "Дмитро")
    article_comment.add_reply(comment2)

    comment2_1 = Comment("JavaScript теж цікавий, але Python простіший", "Наталія")
    comment2.add_reply(comment2_1)

    comment2_1_1 = Comment("Це справді так!", "Віктор")
    comment2_1.add_reply(comment2_1_1)

    comment2_2 = Comment("Кожна мова має свої переваги", "Олена")
    comment2.add_reply(comment2_2)

    article_comment.display()

    print("\n\n=== Test: delete intermediate comment ===\n")

    comment2.remove_reply()
    article_comment.display()
