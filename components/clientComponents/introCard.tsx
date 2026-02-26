"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import IntroOverlay from "./introOverlay";

export default function IntroCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <Card>
        <CardHeader>
          <CardTitle>Introduction the course flow</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-4">
          <div>
            <CardDescription>
              Introduction how to start learning and how to begin your journey.
            </CardDescription>

            <Button
              onClick={() => setOpen(true)}
              className="mt-4 bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
            >
              <Play className="mr-2 h-4 w-4" /> Watch Now
            </Button>
          </div>

          
        </CardContent>
      </Card>
      {/* Absolute overlay */}
      {open && <IntroOverlay onClose={() => setOpen(false)} />}
    </>
  );
}