"use client";
import { useMemo, useState } from "react";

const UploadCSVButton = (props: { onUpload: (csv: string[][]) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <label
        htmlFor="upload-csv"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload <code>subscriber-list.csv</code>
      </label>
      <input
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
        <div className="text-xl">{`You're eligible! You have ${calculation} recurring subs`}</div>
      );

    return (
      <div className="text-xl">{`You're not eligible :( you have ${calculation} recurring subs, which is ${
        350 - calculation
      } away`}</div>
    );
  }

  return (
    <div>
      <h2 className="text-xl">
        Step 1: Go to the{" "}
        <a
          href="https://dashboard.twitch.tv/analytics/revenue-earnings/subscriptions"
          target="_blank"
          className="text-blue-400 underline"
        >
          subscriptions revenue page in the Twitch dashboard
        </a>
      </h2>
      <h2 className="text-xl">
        {
          "Step 2: Click `Download my subscribers list` (on the right under Subscribers)"
        }
      </h2>
      <h2 className="text-xl">{"Step 3: Upload the file below"}</h2>
      <div className="text-gray-200 font-light italic">
        {"(Your data never leaves your computer - "}
        <a
          href="https:/github.com/t3dotgg/70check"
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
    <main className="flex flex-col max-w-5xl p-10 md:py-24 mx-auto">
      <div>
        <h1 className="text-2xl font-bold">70Check</h1>
      </div>
      <div>
        {"A quick way to check if you're eligible for "}
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
      <div className="p-4" />
      <Content />
    </main>
  );
}
