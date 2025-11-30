const pending = new Map<string, Promise<any>>();

let reqId = 0;

async function fetchWithMap(key: string): Promise<any> {
  let existingPromise;
  while ((existingPromise = pending.get(key))) {
    console.log("await existing");
    const result = await existingPromise;
    return result;
  }

  let id = reqId++;
  console.log("starting req", id);
  const promise = Promise.resolve()
    .then(async () => {
      console.log("will fetch");
      const response = await fetch("https://httpbin.org/get", {
        headers: { accept: "application/json" },
        cache: "no-store",
      });
      console.log("did fetch");
      return response.json();
    })
    .finally(() => {
      console.log("finishing req", id);
      pending.delete(key);
    });

  pending.set(key, promise);
  return promise;
}

export default async function TestLayout({ children }: { children: React.ReactNode }) {
  await fetchWithMap("test");
  return (
    <div>
      <p>NESTED-LAYOUT-DONE</p>
      {children}
    </div>
  );
}
