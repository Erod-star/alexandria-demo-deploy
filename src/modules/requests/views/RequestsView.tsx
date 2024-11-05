// ? Components
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components';

function RequestsView() {
  return (
    <div className="h-full">
      <Card className="flex-grow h-full border-none">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Peticiones</CardTitle>

          <Button className="text-base font-semibold">+ Petición</Button>
        </CardHeader>

        <CardContent>
          <h3>Aqui va la tabla!</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default RequestsView;
