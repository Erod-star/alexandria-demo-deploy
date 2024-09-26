
import { CircleAlert } from 'lucide-react';


interface EmptyProps {
    description?: string;
    header?: string;
}

export const Empty = ({ description = 'No se encontraron resultados para este recurso', header = 'Sin resultados' }
    : EmptyProps) => {

    return (
        <div className='flex-center'>
            <div className='m-8 text-center p-12 rounded-sm bg-gray-600 border border-white'>
                <div className='flex-center mb-2'>
                    <CircleAlert className='size-[100px]' />
                </div>
                <h2 className="text-2xl font-bold"
                >{header}</h2>
                <p>{description}</p>
            </div>
        </div>
    )

}