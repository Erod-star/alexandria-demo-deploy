// ? Components
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components';

function PublicationsView() {
  return (
    <div className="h-full">
      <Card className="flex-grow h-full border-none">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Publicaciones</CardTitle>

          <Button className="text-base font-semibold">+ Publicación</Button>
        </CardHeader>

        <CardContent>
          <h3>Aqui va la tabla!</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default PublicationsView;
