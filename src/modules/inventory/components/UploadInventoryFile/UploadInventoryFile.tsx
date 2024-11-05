import { useNavigate } from 'react-router-dom';

// ? Utils
import { cn } from '@/lib/utils';

// ? Icons
import { FileUp } from 'lucide-react';

// ? Components
import { Button, Input, Label, LoadingSpinner, Separator } from '@/components';

// ? Hooks
import {
  useInventoryMutations,
  useInventoryStore,
} from '@/modules/inventory/hooks';

export const UploadInventoryFile = () => {
  const navigate = useNavigate();
  const { setCurrentStep } = useInventoryStore();
  const { createByFileMutation } = useInventoryMutations();
  const { mutateAsync: createByFile, isPending: isUploadingFile } =
    createByFileMutation;

  const handleUploadFile = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];
    if (!selectedFile) return;
    createByFile(selectedFile);
  };

  return (
    <div className="w-full h-full flex-center flex-col">
      <Button
        className="absolute left-6 top-5"
        disabled={isUploadingFile}
        onClick={() => navigate('/inventario')}
      >
        Regresar a la lista de propiedades
      </Button>

      <h2 className="text-3xl sm:text-4xl font-semibold mb-10">
        🏚️ Agregar propiedad
      </h2>

      <section className="flex items-center justify-center mb-10">
        <Label
          htmlFor="dropzone-file"
          className={cn(
            `flex-center flex-col h-48 border border-dashed border-alt-green-300 bg-transparent rounded-md transition-all px-8 w-full md:px-32`,
            isUploadingFile
              ? 'bg-transparent/60'
              : 'hover:bg-transparent/60 hover:cursor-pointer'
          )}
        >
          {isUploadingFile ? (
            <div className="flex flex-col items-center gap-5">
              <p className="text-xl text-gray-200 font-semibold">
                Subiendo archivo...
              </p>
              <LoadingSpinner className="size-7" />
            </div>
          ) : (
            <div className="flex-center pt-5 pb-6 gap-3">
              <FileUp className="size-7 sm:size-8" />
              <p className="text-lg sm:text-xl text-gray-200 font-semibold">
                Selecciona o arrastra el archivo
              </p>
            </div>
          )}

          <Input
            id="dropzone-file"
            type="file"
            className="hidden"
            disabled={isUploadingFile}
            onChange={handleUploadFile}
          />
        </Label>
      </section>

      {isUploadingFile ? (
        <p>
          El archivo esta siendo procesado, esto podria llegar a tardar algunos
          minutos...
        </p>
      ) : (
        <>
          <div className="flex-center gap-5 w-2/4 overflow-hidden text-xl">
            <Separator /> ó <Separator />
          </div>

          <section className="space-y-3 mt-10">
            <h3 className="text-xl text-center mb-5">
              Crea tu propiedad de forma manual
            </h3>

            <div className="flex justify-center">
              <Button
                disabled={isUploadingFile}
                onClick={() => setCurrentStep(1)}
              >
                Comenzar llenado manual
              </Button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
