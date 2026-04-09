import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { useEffect, useMemo, useState } from "react";
import Oportunidade from "../../types/Oportunidade";
import Spinner from "../../components/ui/spinner";
import OportunidadeTable from "../../components/tables/OportunidadeTable";
import Button from "../../components/ui/button/Button";
import { PlusIcon } from "../../icons";
import { Modal } from "../../components/ui/modal";
import Form from "../../components/form/Form";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import formDataToObject from "../../utils/formDataToObject";
import OportunidadeStatus from "../../types/OportunidadeStatus";

export default function OportunidadePage() {
  const [oportunidades, setOportunidades] = useState<Oportunidade[]|null>(null);
  const [formModalOpen, setFormModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingEnvio, setIsLoadingEnvio] = useState<boolean>(false);

  async function getOportunidades() {
    setIsLoading(true);
    const res = await fetch(import.meta.env.VITE_API_URL + "/oportunidades");
    const data = await res.json();

    await new Promise((res, rej) => setTimeout(() => res(""), 1000));

    setOportunidades(data);
    setIsLoading(false);
  }

  async function enviarOportunidade(payload: FormData) {
    setIsLoadingEnvio(true);
    let body = formDataToObject(payload);
    const res = await fetch(import.meta.env.VITE_API_URL + "/oportunidades", {
      method: "POST",
      body: JSON.stringify(body)
    });
    console.log(body)
    setIsLoadingEnvio(false)

  }

  const [filtro, setFiltro] = useState<OportunidadeStatus | "">("");

  const filtrados = useMemo(() => {
    if(!oportunidades) return [];
    if(filtro == "") {
      return oportunidades;
    }

    return oportunidades?.filter((oportunidade) => oportunidade.status == filtro);

  }, [filtro, oportunidades]);

  useEffect(() => {
    getOportunidades();
  }, []);

  return (
    <>
      <PageBreadcrumb pageTitle="Oportunidades" />

      <div className="space-y-6">
        <ComponentCard title="Oportunidades">
          <div>
            <Label>Status</Label>
            <Select
              options={[
                {label: "Todas", value: ""},
                {label: "Abertas", value: "Aberta"},
                {label: "Perdidas", value: "Perdida"},
                {label: "Ganha", value: "Ganha"}
              ]}
              onChange={(e) => {
                setFiltro(e as OportunidadeStatus)
              }}
            />
          </div>
          {isLoading 
            ? <div className="w-full flex justify-center"><Spinner /></div>
            :  <OportunidadeTable data={filtrados} />
          }
          <div className="w-full flex md:justify-end justify-stretch">
            <Button className="bg-green-600 w-full" onClick={() => setFormModalOpen(true)}> <PlusIcon />Adicionar</Button>
          </div>
        </ComponentCard>
      </div>

      <div>
        <Modal title="Adicionar Oportunidade" isOpen={formModalOpen} onClose={() => setFormModalOpen(false)}>
          <div className="w-[min(100vw,700px)] p-4">
            <Form onSubmit={(e) => {
              const formData = new FormData(e.currentTarget);
              enviarOportunidade(formData);

            }} className="grid gap-4">
              <div>
                <Label>Cliente</Label>
                <Input placeholder="Galego" type="text" name="cliente"/>
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  options={[
                    {value: "Aberta", label: "Aberta"},
                    {value: "Ganha", label: "Ganha"},
                    {value: "Perdida", label: "Perdida"},
                  ]}
                  name="status"
                  onChange={() => {}}
                />
              </div>


              <div>
                <Label>Valor</Label>
                <Input placeholder="1234,56" type="text" name="valor"/>
              </div>

              <Button type="submit">Enviar</Button>
            </Form>
          </div>
        </Modal>
      </div>
    </>
  );
}
