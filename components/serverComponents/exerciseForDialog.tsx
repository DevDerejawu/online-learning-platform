// import React from 'react'
// import CommonFormElementForContents from './commonFormElementForContents'
// import { Field, FieldLabel } from '../ui/field'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { Textarea } from '../ui/textarea'

// const ExerciseForDialog = ({close}:{close:()=>void}) => {
//   return (
//     <form>
//       <CommonFormElementForContents contentType="Exercise"/>
//            <Field>
//             <FieldLabel htmlFor="content-markdown">Enter exercise markdown</FieldLabel>
//             <Textarea id="content-markdown" name="content-markdown" placeholder="Note content markdown"/>
//            </Field>
//           <div className="flex items center justify-center gap-4 mt-3"><Button type="submit" className="cursor-pointer">Add exercise</Button><Button className="bg-red-600 hover:bg-red-500 cursor-pointer" type="button" onClick={close}>Cancel</Button></div>
//     </form>
//   )
// }

// export default ExerciseForDialog