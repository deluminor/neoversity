from __future__ import annotations

import turtle
from dataclasses import dataclass, field


@dataclass
class KochSnowflakeDrawer:
    line_length: float = 300.0
    pen_color: str = "#195d9d"
    background_color: str = "#f7fbff"
    pen_size: int = 2
    animation_speed: int = 0
    _screen: "turtle.TurtleScreen" = field(init=False, repr=False)
    _turtle: "turtle.Turtle" = field(init=False, repr=False)

    def __post_init__(self) -> None:
        self._screen = turtle.Screen()
        self._screen.bgcolor(self.background_color)
        self._turtle = turtle.Turtle()
        self._turtle.speed(self.animation_speed)
        self._turtle.color(self.pen_color)
        self._turtle.pensize(self.pen_size)
        self._turtle.hideturtle()

    def draw(self, order: int) -> None:
        if order < 0:
            raise ValueError("Order must be a non-negative integer.")

        self._prepare_starting_position()
        for _ in range(3):
            self._draw_segment(order, self.line_length)
            self._turtle.right(120)
        self._screen.mainloop()

    def _prepare_starting_position(self) -> None:
        self._turtle.penup()
        self._turtle.setheading(0)
        offset = self.line_length / 2
        self._turtle.goto(-offset, offset / 1.5)
        self._turtle.pendown()

    def _draw_segment(self, order: int, length: float) -> None:
        if order == 0:
            self._turtle.forward(length)
            return

        length /= 3
        self._draw_segment(order - 1, length)
        self._turtle.left(60)
        self._draw_segment(order - 1, length)
        self._turtle.right(120)
        self._draw_segment(order - 1, length)
        self._turtle.left(60)
        self._draw_segment(order - 1, length)
