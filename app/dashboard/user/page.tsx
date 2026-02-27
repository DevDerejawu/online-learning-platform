import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { BarChartForExeProNote } from "@/components/clientComponents/barChartForExeProNote" 
import PieChartForProjects from "@/components/clientComponents/pieChartForProjects"
import HandleCodeCleanup from "./handleCodeQueryCleanUp/page"
import { createClient } from "@/lib/supabase/server"
import IntroCard from "@/components/clientComponents/introCard"


const DashboardOverview = async() => {
  const supabase = await createClient()
  const {data:{user}, error:errorGetUserId} = await supabase.auth.getUser();
  let userId = user?.id;

  const { data: contents, error } = await supabase
  .from('contents')
  .select(`
    content_types (
      name
    )
  `)
if(!errorGetUserId){
  console.log("errorGetUserId", errorGetUserId);
}
function asContentType(data:unknown){
  return data as {name:string}
}

// group totals
const totalByType = contents?.reduce((acc, item) => {
  const type = asContentType(item.content_types)?.name;

  if (!type) return acc;
  acc[type] = (acc[type] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
console.log("totalBytypeeeeeeeee", totalByType)
  const { data: submitted, error: submitError } = await supabase
  .from('submitted_project_note_exercise')
  .select(`
    contents (
      content_types (
        name
      )
    )
  `)
  .eq('submitted_by', userId);
if(!submitError){
console.log("submitError", submitError)
}

type submittedType = {
  contents: {content_types:{name:string}}
}[]
function asContent(data: unknown) {
  return data as {content_types: {name: string}};
}
// group submitted
const submittedByType = (submitted)?.reduce((acc, row) => {
  const type = asContent(row.contents)?.content_types?.name;
  acc[type] = (acc[type] || 0) + 1;
  return acc;
}, {} as Record<string, number>);


  return (
    <>
    <HandleCodeCleanup/>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 tems-center justify-center m-4">

      <IntroCard/>
      <Card>
        <CardHeader>
           <CardTitle className="text-xl">Total projects: <span className="text-2xl text-blue-700">{totalByType?.Project || 0}</span></CardTitle>
        </CardHeader>
       <CardContent>
        
          <CardDescription>Projects provide step-by-step instructions that correspond to the related video.</CardDescription>
          <h2 className="text-xl mt-3">Completed projects:<span className="text-2xl text-blue-700">{submittedByType?.Project || 0}/{totalByType?.Project || 0}</span></h2>
          
          
       </CardContent>
      </Card>
      <Card>
        <CardHeader>
           <CardTitle className="text-xl">Total numbers of notes: <span className="text-2xl text-blue-700">{totalByType?.Note || 0}</span></CardTitle>
        </CardHeader>
       <CardContent>
        <CardDescription>Notes offer a clear explanation of the concepts covered in that specific video.
</CardDescription>
        <h2 className="text-xl mt-3">Completed notes:<span className="text-2xl text-blue-700">{submittedByType?.Note || 0}/{totalByType?.Note || 0}</span></h2>
          
       </CardContent>
      </Card>

      <Card>
        <CardHeader>
           <CardTitle className="text-xl">Total numbers of Exercises : <span className="text-2xl text-blue-700">{totalByType?.Exercise || 0}</span></CardTitle>
        </CardHeader>
       <CardContent>
        
          <CardDescription>Exercises present a short, focused challenge related to the same video to help reinforce understanding.</CardDescription>
          <h2 className="text-xl mt-3">Completed exercises:<span className="text-2xl text-blue-700">{submittedByType?.Exercise || 0}/{totalByType?.Exercise || 0}</span></h2>
          
       </CardContent>
      </Card>
      <BarChartForExeProNote submittedByType={submittedByType} totalByType={totalByType}/>
      <PieChartForProjects submittedByType={submittedByType} totalByType={totalByType}/>
    </div>
    </>
  )
}

export default DashboardOverview