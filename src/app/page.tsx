"use client";
import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const UploadCSVButton = (props: { onUpload: (csv: string[][]) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Button>
        <Label htmlFor="upload-csv" className="hover:cursor-pointer">
          Upload <code>subscriber-list.csv</code>
        </Label>
      </Button>
      <Input
        id="upload-csv"
        type="file"
        className="hidden"
        accept=".csv"
        onChange={(e) => {
          const file = e.target.files![0];
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target!.result;
            if (typeof text !== "string") throw new Error("");
            const data = text!.split("\n").map((row) => row.split(","));
            console.log(data);
            props.onUpload(data);
          };
          reader.readAsText(file);
        }}
      />
    </div>
  );
};

const Content = () => {
  const [csv, setCsv] = useState<string[][] | null>(null);

  const calculation = useMemo(() => {
    if (!csv) return 0;

    return csv.filter((row) => row[5] === "recurring").length;
  }, [csv]);

  if (csv) {
    if (calculation > 350)
      return (
        <div className="text-xl text-center">
        {`You're eligible! 🥳 `} <br />
        {`you have ${calculation} recurring subs`} <br />
        </div>
      );

    return (
      <div className="text-xl text-center">
        {`You're not eligible 😔 `} <br />
        {`You have ${calculation} recurring subs,`} <br />
        {` which is ${
          350 - calculation
        } away`}
      </div>
    );
  }

  return (
    <div>
      <ol className="list-decimal list-inside mb-4">
        <li>
          {"Download the CSV from "}
          <a
            href="https://dashboard.twitch.tv/analytics/revenue-earnings/subscriptions"
            target="_blank"
            className="text-blue-400 underline"
          >
            {"the Twitch dashboard"}
          </a>
        </li>
        <li>{"Upload the CSV below"}</li>
        <li>{"See if you're eligible!"}</li>
      </ol>
      <div className="text-gray-200 font-light italic text-xs">
        {"(Your data never leaves your computer - "}
        <a
          href="https://github.com/t3dotgg/70check"
          target="_blank"
          className="text-blue-400 underline"
        >
          {"source code here"}
        </a>
        {")"}
      </div>

      <div className="p-4" />
      <UploadCSVButton onUpload={setCsv} />
    </div>
  );
};

export default function Home() {
  return (
    <main className="container flex items-center justify-center min-h-screen font-sans max-w-[550px]">
      <div>
        <div>
          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-5xl font-bold mb-4">70Check</h1>
            <div className="mb-4 text-center">
              {"A quick way to check if you're eligible for "}
              <br />
              <a
                href="https://blog.twitch.tv/en/2023/06/15/introducing-the-partner-plus-program/"
                target="_blank"
                className="text-blue-400 underline"
              >
                {'Twitch\'s new 70/30 split "Partner Plus" Program'}
              </a>
              <br />
              <div className="text-gray-200 font-light italic">
                {"(Quickly made by "}
                <a
                  href="https://twitter.com/t3dotgg"
                  target="_blank"
                  className="text-blue-400 underline"
                >
                  {"Theo"}
                </a>
                {")"}
              </div>
            </div>
          </div>
        </div>
        <Card>
          <CardContent className="mt-5 h-[210px] max-w-[430px] sm:min-w-[430px] flex items-center justify-center">
            <Content />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
