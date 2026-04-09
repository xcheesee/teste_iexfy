import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Oportunidade from "../../types/Oportunidade";
import OportunidadeStatus from "../../types/OportunidadeStatus";
import { PencilIcon, TrashBinIcon } from "../../icons";
import { useFeedbackModal } from "../providers/FeedbackModalProvider";
import { FeedbackModal } from "../ui/modal/FeedbackModal";
import { useState } from "react";

interface OportunidadeTableProps {
  data: Oportunidade[] | null;
}
function OportunidadeTable({
  data
}: OportunidadeTableProps) {

  const [loadingDelete, setLoadingDelete] = useState(false);
  const {show} = useFeedbackModal();

  async function delOportunidade(id: number) {
    try {
      setLoadingDelete(true);

      await fetch(import.meta.env.VITE_API_URL + "/oportunidades/" + id, {
        method: "DELETE"
      });

      await new Promise((res, _) => setTimeout(() => res(""), 1000));

      show("Registro excluido", "Oportunidade excluida com sucesso");
      setLoadingDelete(false);
      window.location.reload();
    } catch(e) {
      show("Erro", "Ocorreu um erro! \n" + (e as Error).message);
    }
  }

  const loadingFeedback = loadingDelete ? "cursor-progress" : "";

  return (
    <div className={`overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] ${loadingFeedback}`}>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Cliente
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Valor
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Data
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data?.map((oportunidade, i) => (
              <TableRow key={i}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {oportunidade.cliente}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        oportunidade.status === OportunidadeStatus.Ganha
                          ? "success"
                          : oportunidade.status === OportunidadeStatus.Aberta
                          ? "warning"
                          : "error"
                      }
                    >
                      {oportunidade.status}
                    </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                      <div
                        className="w-12 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                      >
                        {oportunidade.valor}
                      </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {oportunidade.data}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm flex gap-4 dark:text-gray-400">
                    <PencilIcon />
                    <TrashBinIcon className="cursor-pointer" onClick={() => {delOportunidade(oportunidade.id)}} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default OportunidadeTable;
