"use client";
import { useMemo, useState } from "react";

const UploadCSVButton = (props: { onUpload: (csv: string[][]) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <label
        htmlFor="upload-csv"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload CSV
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
        <div>{`You're eligible! You have ${calculation} recurring subs`}</div>
      );

    return (
      <div>{`You're not eligible :( you have ${calculation} recurring subs, which is ${
        350 - calculation
      } away`}</div>
    );
  }

  return (
    <div>
      <h2 className="text-xl">
        Step 1: Go to{" "}
        <a
          href="https://dashboard.twitch.tv"
          className="text-blue-400 underline"
        >
          dashboard.twitch.tv
        </a>
      </h2>

      <h2 className="text-xl">{"Step 2: Go to Analytics -> Earnings"}</h2>

      <h2 className="text-xl">
        {"Step 3: Find the `Subscribers` widget and click `View details`"}
      </h2>

      <h2 className="text-xl">
        {
          "Step 4: Click `Download my subscribers list` (on the right under Subscribers)"
        }
      </h2>

      <UploadCSVButton onUpload={setCsv} />
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Content />
    </main>
  );
}
