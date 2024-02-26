// A single component that togles the global sound state
import useSoundEnabled from "../hooks/useSoundEnabled";

export default function SoundEnabled() {
    const [soundEnabled, setSoundEnabled] = useSoundEnabled();

    return (
        <div className="fixed top-0 right-0 p-5">
            <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="bg-red-600 text-white p-2 rounded-md"
            >
                {soundEnabled ? "Sound On" : "Sound Off"}
            </button>
        </div>
    );
}