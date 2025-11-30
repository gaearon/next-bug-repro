const pending = new Map<string, Promise<any>>();

async function dedup(key: string): Promise<string> {
  let existingPromise;
  while ((existingPromise = pending.get(key))) {
    console.log("await existing");
    return await existingPromise;
  }

  console.log("starting");
  const promise = new Promise<string>((resolve) => {
    setTimeout(() => {
      console.log("done");
      resolve("ok");
    }, 100);
  }).finally(() => {
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
