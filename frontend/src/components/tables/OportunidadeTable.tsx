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

interface OportunidadeTableProps {
  data: Oportunidade[] | null;
  onEditClick: (arg: Oportunidade) => void;
  onDeleteClick: (arg: Oportunidade) => void;
}
function OportunidadeTable({
  data,
  onEditClick,
  onDeleteClick
}: OportunidadeTableProps) {

  return (
    <>
    <div className={`overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]`}>
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

                <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex">
                      <div
                        className="w-24 h-6 overflow-hidden"
                      >
                        {oportunidade.valor}
                      </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {oportunidade.data}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm flex gap-4 dark:text-gray-400">
                    <PencilIcon onClick={() => onEditClick(oportunidade)} className="cursor-pointer"/>
                    <TrashBinIcon className="cursor-pointer" onClick={() => onDeleteClick(oportunidade)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </>
  );
}

export default OportunidadeTable;
