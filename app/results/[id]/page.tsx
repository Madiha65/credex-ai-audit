type AuditItem = {
  tool: string;
  savings: number;
};

export default async function ResultPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/result/${params.id}`
  );

  const data: AuditItem[] =
    await result.json();

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        Audit Result
      </h1>

      <div className="grid gap-4">
        {data.map(
          (
            item: AuditItem,
            index: number
          ) => (
            <div
              key={index}
              className="border p-5 rounded-2xl"
            >
              <p>{item.tool}</p>

              <p>
                ${item.savings} saved monthly
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}