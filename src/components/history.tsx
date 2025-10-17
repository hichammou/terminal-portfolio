import { useHistory } from "@/context/HistoryContext";
import Input from "./input";

function History() {
  const { history } = useHistory();
  return (
    <>
      {history.length >= 0 && <Input />}
      {history.map((item, index) => (
        <Input key={`${index}-${item}`} />
      ))}
    </>
  );
}

export default History;
