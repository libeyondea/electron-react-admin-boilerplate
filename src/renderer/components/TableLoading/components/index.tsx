import classNames from 'classnames';
import TableComponent from 'renderer/components/Table/components';

type Props = {
  className?: string;
};

const TableLoadingComponent: React.FC<Props> = ({ className }) => {
  return (
    <TableComponent className={classNames('animate-pulse', className)}>
      <TableComponent.Thead>
        <TableComponent.Tr>
          <TableComponent.Th>
            <div className="h-6 bg-slate-200 rounded-md"></div>
          </TableComponent.Th>
        </TableComponent.Tr>
      </TableComponent.Thead>
      <TableComponent.Tbody>
        <TableComponent.Tr>
          <TableComponent.Td>
            <div className="h-6 bg-slate-200 rounded-md"></div>
          </TableComponent.Td>
        </TableComponent.Tr>
        <TableComponent.Tr>
          <TableComponent.Td>
            <div className="h-6 bg-slate-200 rounded-md"></div>
          </TableComponent.Td>
        </TableComponent.Tr>
        <TableComponent.Tr>
          <TableComponent.Td>
            <div className="h-6 bg-slate-200 rounded-md"></div>
          </TableComponent.Td>
        </TableComponent.Tr>
        <TableComponent.Tr>
          <TableComponent.Td>
            <div className="h-6 bg-slate-200 rounded-md"></div>
          </TableComponent.Td>
        </TableComponent.Tr>
        <TableComponent.Tr>
          <TableComponent.Td>
            <div className="h-6 bg-slate-200 rounded-md"></div>
          </TableComponent.Td>
        </TableComponent.Tr>
      </TableComponent.Tbody>
    </TableComponent>
  );
};

export default TableLoadingComponent;
