// app/components/ThemeSwitcher.tsx
"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themes = [
  { displayName: "☀️", id: "light" },
  { displayName: "🌙", id: "dark" }
];

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <ButtonGroup>
        {themes.map(_theme => (
          <Button isDisabled={theme === _theme.id} onClick={() => setTheme(_theme.id)}>
            {_theme.displayName}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
