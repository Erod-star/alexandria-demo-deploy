// ? Icons
import { House } from 'lucide-react';

// ? Components
import { TableCell, TableRow } from '@/components';

interface LeadsPropertyCollapsibleProps {
  properties: string[];
}

export const LeadsPropertyCollapsible = ({
  properties,
}: LeadsPropertyCollapsibleProps) => {
  return (
    <>
      {properties.length > 0 && (
        <>
          <TableRow>
            <TableCell
              className="text-alt-green-300 font-medium text-lg "
              colSpan={2}
            >
              Propiedades
            </TableCell>

            <TableCell className="text-alt-green-300 font-medium text-lg">
              Estado
            </TableCell>
          </TableRow>

          {properties.map((property) => (
            <TableRow key={property}>
              <TableCell colSpan={2}>
                <div className="w-full flex items-center gap-3">
                  <House className="size-5" />
                  <p>{property}</p>
                </div>
              </TableCell>

              <TableCell className="text-green-400">{property}</TableCell>
            </TableRow>
          ))}
        </>
      )}
    </>
  );
};
