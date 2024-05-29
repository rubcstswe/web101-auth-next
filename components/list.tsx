import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function List({ data }: { data: any[] }) {
  //   const listItems = data.map((item) => <li>{item}</li>);

  //   return <ul>{listItems}</ul>;

  return (
    <Table>
      <TableCaption>A list of your recent tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Task</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item}>
            <TableCell className="font-medium">{item}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
