export default function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <button
            type="button"
            className="cursor-pointer flex w-full items-center justify-center gap-3 rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
            <span className="w-5 h-5 flex items-center justify-center text-base">{icon}</span>
            <span className="flex-1 text-center">{label}</span>
        </button>
    );
}
