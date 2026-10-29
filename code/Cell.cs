// Driftlands — Brisa: Ilhas à Deriva
// Selected original source from Assets/Scripts/Domain/World.cs.
// Shared as a self-contained domain example. No third-party packages are included.
using System;

namespace Ilhas.Domain
{
    [Serializable]
    public struct Cell : IEquatable<Cell>
    {
        public int x, y;
        public Cell(int x, int y) { this.x = x; this.y = y; }
        public bool Equals(Cell other) => x == other.x && y == other.y;
        public override bool Equals(object obj) => obj is Cell other && Equals(other);
        public override int GetHashCode() => unchecked(x * 73856093 ^ y * 19349663);
        public static bool operator ==(Cell a, Cell b) => a.Equals(b);
        public static bool operator !=(Cell a, Cell b) => !a.Equals(b);
        public static Cell operator +(Cell a, Cell b) => new Cell(a.x + b.x, a.y + b.y);
        public int Distance(Cell other) => Math.Abs(x - other.x) + Math.Abs(y - other.y);
        public override string ToString() => $"({x}, {y})";
        public static readonly Cell[] Directions = { new Cell(1, 0), new Cell(0, 1), new Cell(-1, 0), new Cell(0, -1) };
    }
}
