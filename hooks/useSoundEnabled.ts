import { useEffect, useState } from "react";

/**
 * This uses local storage for two reasons (yes I know local storage can be flaky):
 * 1. It's much simpler than setting up some global state
 * 2. It's a good way to persist the setting across sessions
 */
const SOUND_ENABLED_KEY = "zk-soundEnabled";
function useSoundEnabled() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const soundEnabled = localStorage.getItem(SOUND_ENABLED_KEY);
    if (soundEnabled === null) {
      localStorage.setItem(SOUND_ENABLED_KEY, "true");
    } else {
      setSoundEnabled(soundEnabled === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SOUND_ENABLED_KEY, soundEnabled.toString());
  }, [soundEnabled]);

  return [soundEnabled, setSoundEnabled] as const;
}

export default useSoundEnabled;
