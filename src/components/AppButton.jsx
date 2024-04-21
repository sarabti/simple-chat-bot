export default function AppButton({text, onClick}) {
  return (
    <button
      className="bg-pink-200 dark:bg-violet-700 text-black dark:text-white rounded-md px-4 py-2 text-xl "
      onClick={onClick}
    >
      {text}
    </button>
  );
}
