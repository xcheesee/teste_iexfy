import Metricas from "../../components/ecommerce/Metricas";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";

export default function Home() {

  const [overview, setOverview] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  interface overviewRow {
    status: string;
    total: string;
  }

  interface overviewObj {
    [key: string]: string
  }

  async function getOverview() {
    setIsLoading(true);
    const res = await fetch(import.meta.env.VITE_API_URL + "/overview");
    const data = await res.json();

    await new Promise((res, _) => setTimeout(() => res(""), 1000));

    const formatado: overviewObj = {};

    data.forEach((row: overviewRow) => {
      formatado[row.status] = row.total;
    })

    setOverview(formatado);
    setIsLoading(false);
  }

  useEffect(() => {
    getOverview();
  }, []);

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div>Oportunidades</div>
        <div className="col-span-12 space-y-6">
          <Metricas dados={overview} isLoading={isLoading}/>
        </div>
      </div>
    </>
  );
}
