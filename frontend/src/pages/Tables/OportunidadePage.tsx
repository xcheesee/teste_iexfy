import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { useEffect, useState } from "react";
import Oportunidade from "../../types/Oportunidade";
import Spinner from "../../components/ui/spinner";
import OportunidadeTable from "../../components/tables/OportunidadeTable";

export default function OportunidadePage() {
  const [oportunidades, setOportunidades] = useState<Oportunidade[]|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getOportunidades() {
    setIsLoading(true);
    const res = await fetch(import.meta.env.VITE_API_URL + "/oportunidades");
    const data = await res.json();

    await new Promise((res, rej) => setTimeout(() => res(""), 3000));

    setOportunidades(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getOportunidades();
  }, []);

  return (
    <>
      <PageBreadcrumb pageTitle="Oportunidades" />
      <div className="space-y-6">
        <ComponentCard title="Oportunidades">
          {isLoading 
            ? <div className="w-full flex justify-center"><Spinner /></div>
            :  <OportunidadeTable data={oportunidades} />
          }
          
        </ComponentCard>
      </div>
    </>
  );
}
