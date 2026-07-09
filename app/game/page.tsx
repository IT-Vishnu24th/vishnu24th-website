import Game from "@/components/game/Game";

export default function GamePage() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6">
        <h1 className="text-center text-3xl font-bold">
          Vishnu Sustain Trash Sorting Game
        </h1>

        <p className="text-center text-gray-600">
          Sort the trash into the correct bin before time runs out!
        </p>

        <Game />
      </div>
    </main>
  );
}