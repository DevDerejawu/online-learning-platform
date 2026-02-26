"use client"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, LabelList} from "recharts";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
type barProp ={
  submittedByType: Record<string, number> | undefined;
  totalByType: Record<string, number> | undefined
}
const BarChartForExeProNote = ({submittedByType, totalByType}:barProp) => {
  const completedProject = submittedByType?.Project || 1;
  const completedNote = submittedByType?.Note || 1;
  const completedExercise = submittedByType?.Exercise || 1;

  const remainingProject = ((totalByType?.Project || 0 ) - completedProject)< 0? 0: (totalByType?.Project || 0 ) - completedProject;
  const remainingNote = ((totalByType?.Note || 0 ) - completedNote)<0? 0: (totalByType?.Note || 0 ) - completedNote;
  const remainingExercise = ((totalByType?.Exercise || 0 ) - completedExercise)<0? 0: (totalByType?.Note || 0 ) - completedExercise;



  const barData = [
    { name: "Notes", completed: completedNote, remaining: remainingNote },
    { name: "Projects", completed: completedProject, remaining: remainingProject },
    { name: "Exercises", completed: completedExercise, remaining: remainingExercise },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-700 text-[18px]">Project, Exercises, Notes are completd from total.</CardTitle>
        {(!submittedByType?.Project || !submittedByType?.Note || !submittedByType?.Exercise) &&<h2 className="text-red-500 m-2 p-3">If you don't submit any of them, we have added one by default, but after submitting it will automaticall removed!</h2>}
      </CardHeader>
      <CardContent>
        {/* Fixed height on the wrapper is the key! */}
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name"/>
              <YAxis />
              <Tooltip />
               <Legend />
              <Bar dataKey="completed" fill="#2563eb" barSize={40} >
                <LabelList dataKey="completed" position="top" />

              </Bar>
              <Bar dataKey="remaining" fill="#ff253e" barSize={40} >
                <LabelList dataKey="remaining" position="top"/>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};



export { BarChartForExeProNote };