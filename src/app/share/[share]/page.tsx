import { fetchBasicEditorData } from "@/app/action";

async function BasicPage({
  params,
}: {
  params: Promise<{ share: string }>
}) {
  const slug = (await params).share
  const editorData = await fetchBasicEditorData({ id: slug });
  // console.log(editorData);
  return <div>BasicPage</div>;
}

export default BasicPage;
