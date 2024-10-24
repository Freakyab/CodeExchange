import { fetchBasicEditorData } from "@/app/action";
import BasicPage from "@/components/Basic/basicPage";

async function Page({ params }: { params: Promise<{ share: string }> }) {
  const slug = (await params)?.share;
  if (!slug) {
    return <div>Invalid Share</div>;
  }
  const editorData = await fetchBasicEditorData({ id: slug });

  return (
    <div className="flex min-h-screen h-full fancyBackground">
      <BasicPage data={editorData.data?.code} editorId={slug}/>
    </div>
  );
}

export default Page;
