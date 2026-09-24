from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, List


@dataclass(frozen=True)
class MoveLog:
    action: str
    state: Dict[str, List[int]]


@dataclass
class HanoiSolver:
    disk_count: int
    source: str = "A"
    auxiliary: str = "B"
    target: str = "C"
    history: List[MoveLog] = field(default_factory=list, init=False)
    _state: Dict[str, List[int]] = field(init=False, repr=False)

    def __post_init__(self) -> None:
        if self.disk_count <= 0:
            raise ValueError("Disk count must be a positive integer.")
        self.reset()

    def reset(self) -> None:
        self._state = {
            self.source: list(range(self.disk_count, 0, -1)),
            self.auxiliary: [],
            self.target: [],
        }
        self.history.clear()

    def solve(self) -> List[MoveLog]:
        self.history = [MoveLog("Initial state", self._snapshot())]
        self._move(self.disk_count, self.source, self.target, self.auxiliary)
        self.history.append(MoveLog("Final state", self._snapshot()))
        return list(self.history)

    def _move(self, n: int, source: str, target: str, auxiliary: str) -> None:
        if n == 0:
            return
        if n == 1:
            self._record_move(source, target)
            return
        self._move(n - 1, source, auxiliary, target)
        self._record_move(source, target)
        self._move(n - 1, auxiliary, target, source)

    def _record_move(self, source: str, target: str) -> None:
        disk = self._state[source].pop()
        if self._state[target] and self._state[target][-1] < disk:
            raise ValueError("Cannot place a larger disk on top of a smaller disk.")
        self._state[target].append(disk)
        action = f"Move disk from {source} to {target}: {disk}"
        self.history.append(MoveLog(action, self._snapshot()))

    def _snapshot(self) -> Dict[str, List[int]]:
        return {peg: disks.copy() for peg, disks in self._state.items()}
