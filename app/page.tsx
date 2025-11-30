async function cachedFn(): Promise<void> {
  "use cache";
  await new Promise((resolve) => setTimeout(resolve, 100));
}

export default async function Page() {
  await cachedFn();
  return <p>page content</p>;
}
