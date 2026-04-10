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
import { useFeedbackModal } from "../../components/providers/FeedbackModalProvider";

export default function OportunidadePage() {
  const [oportunidades, setOportunidades] = useState<Oportunidade[]|null>(null);
  const [currOportunidade, setCurrOportunidade] = useState<Oportunidade|null>(null);

  const [formModalOpen, setFormModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingEnvio, setIsLoadingEnvio] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState(false);

  const { show: showFeedbackModal } = useFeedbackModal();

  async function getOportunidades() {
    setIsLoading(true);
    const res = await fetch(import.meta.env.VITE_API_URL + "/oportunidades");
    const data = await res.json();

    await new Promise((res, _) => setTimeout(() => res(""), 1000));

    setOportunidades(data);
    setIsLoading(false);
  }

  async function enviarOportunidade(payload: FormData) {
    try {
      setIsLoadingEnvio(true);
      let body = formDataToObject(payload);
      await new Promise((res, _) => setTimeout(() => res(""), 1000));

      if(isEdit) {
        await fetch(import.meta.env.VITE_API_URL + "/oportunidades/" + body.id, {
          method: "PATCH",
          body: JSON.stringify(body)
        });

        showFeedbackModal("Sucesso!", "Oportunidade alterada com sucesso!");
      } else {
        await fetch(import.meta.env.VITE_API_URL + "/oportunidades", {
          method: "POST",
          body: JSON.stringify(body)
        });

        showFeedbackModal(
          "Sucesso!", 
          "Oportunidade enviada com sucesso!", 
          "success", 
          () => {setFormModalOpen(false)}
        );
      }

      setIsLoadingEnvio(false);
      getOportunidades();

    } catch(e){
      setIsLoadingEnvio(false);
      showFeedbackModal("Atencao", "Erro ao enviar registro! \n" + (e as Error).message, "error");
    }
  }

  async function deleteOportunidade(id: number | undefined) {
    try {
      if(!id) {
        throw new Error("Id nao encontrado");
      }

      setIsLoadingEnvio(true);

      await fetch(import.meta.env.VITE_API_URL + "/oportunidades/" + id, {
        method: "DELETE"
      });

      await new Promise((res, _) => setTimeout(() => res(""), 1000));

      showFeedbackModal(
        "Registro excluido", 
        "Oportunidade excluida com sucesso",
        "success",
        () => setDeleteModalOpen(false)
      );
      setIsLoadingEnvio(false);
      getOportunidades();
    } catch(e) {
      showFeedbackModal("Erro", "Ocorreu um erro! \n" + (e as Error).message);
      setIsLoadingEnvio(false);
    }

  }

  function handleEditOportunidade(oportunidade: Oportunidade) {
    setCurrOportunidade(oportunidade);
    setIsEdit(true);
    setFormModalOpen(true);
  }

  function hadleAddOportunidade() {
    setCurrOportunidade(null);
    setIsEdit(false);
    setFormModalOpen(true);
  }

  function handleDeleteOportunidade(oportunidade: Oportunidade) {
    setCurrOportunidade(oportunidade);

    setDeleteModalOpen(true);
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
              onChange={(e) => { setFiltro(e as OportunidadeStatus) }}
            />
          </div>
          {isLoading 
            ?<div className="w-full flex justify-center"><Spinner /></div>
            :<OportunidadeTable 
              data={filtrados} 
              onEditClick={handleEditOportunidade}
              onDeleteClick={handleDeleteOportunidade}
            />
          }
          <div className="w-full flex md:justify-end justify-stretch">
            <Button className="bg-green-600 hover:bg-green-800 w-full" onClick={hadleAddOportunidade}> 
              <PlusIcon />Adicionar
            </Button>
          </div>
        </ComponentCard>
      </div>

      <div>
        <Modal 
          title={`${isEdit ? "Editar" : "Adicionar" } Oportunidade`} 
          isOpen={formModalOpen} 
          onClose={() => setFormModalOpen(false)}
        >
          <div className="w-[min(100vw,700px)] p-4">
            <Form 
              onSubmit={(e) => {
                const formData = new FormData(e.currentTarget);

                enviarOportunidade(formData);
              }} 
              className="grid gap-4"
            >
              <div>
                <Input type="hidden" defaultValue={currOportunidade?.id ?? -1} name="id" />
              </div>

              <div>
                <Label>Cliente</Label>
                <Input 
                  placeholder="Galego" 
                  type="text" 
                  name="cliente" 
                  defaultValue={currOportunidade?.cliente ?? ""} 
                  readOnly={isEdit}
                  className={`${isEdit ? "bg-neutral-200! cursor-not-allowed" : "bg-white"}`}
                />
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
                  defaultValue={currOportunidade?.status}
                />
              </div>


              <div>
                <Label>Valor</Label>
                <Input placeholder="1234,56" type="text" name="valor" defaultValue={currOportunidade?.valor}/>
              </div>

              <Button type="submit">
                {isLoadingEnvio && <Spinner />}
                Enviar
              </Button>
            </Form>
          </div>
        </Modal>

        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Excluir oportunidade"
        >
          <div className="w-[min(100vw,700px)] p-4">
            <div>Deseja realmente excluir o registro?</div>
          </div>
          <div className="w-full flex justify-stretch gap-4 p-4">
            <Button 
              onClick={() => deleteOportunidade(currOportunidade?.id)}
              className="w-full bg-red-500 hover:bg-red-700"
            >
              {isLoadingEnvio && <Spinner />}
              Confirmar
            </Button>

            <Button
              onClick={() => setDeleteModalOpen(false)}
              className="text-neutral-600 border-neutral-800 w-full"
              variant="outline"

            >
              Cancelar
            </Button>
          </div>



        </Modal>

      </div>
    </>
  );
}
