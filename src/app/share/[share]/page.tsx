import { fetchBasicEditorData } from "@/app/action";

async function BasicPage({ params }: { params: { share: string } }) {
  console.log(params.share);
  const editorData = await fetchBasicEditorData({ id: params.share });
  console.log(editorData);
  return <div>BasicPage</div>;
}

export default BasicPage;
