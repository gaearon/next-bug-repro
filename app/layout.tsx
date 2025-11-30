const pending = new Map<string, Promise<any>>();

async function dedup(key: string): Promise<any> {
  let existingPromise;
  while ((existingPromise = pending.get(key))) {
    console.log("await existing");
    return await existingPromise;
  }

  console.log("starting");
  const promise = fetch("https://httpbin.org/get", { cache: "no-store" })
    .then((res) => {
      console.log("done");
      return res.json();
    })
    .finally(() => {
      pending.delete(key);
    });

  pending.set(key, promise);
  return promise;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await dedup("test");
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
