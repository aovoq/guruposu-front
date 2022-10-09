import { Box, Group, TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import 'dayjs/locale/ja'
import { DatePicker } from '@mantine/dates'

const UpdateCampModal = (props: any) => {
   const form = useForm({
      initialValues: {
         camp_id: props.camp.id || '',
         name: props.camp.name|| '',
         description: props.camp.description || '',
         location: props.camp.location || '',
         start_date: new Date(props.camp.start_date) || '',
         end_date: new Date(props.camp.end_date) || '',
      },

      validate: {
         name: (value) => (value.length < 2 ? '名前は二文字以上必要です' : null),
      },
   })

   return (
      <Box>
         <form onSubmit={form.onSubmit((values) => props.submit(values))}>
            <TextInput
               label='キャンプ名'
               placeholder='例: 上智大学スプリングキャンプ'
               {...form.getInputProps('name')}
            />
            <TextInput label='備考' placeholder='' {...form.getInputProps('description')} />
            <TextInput label='場所' placeholder='例: 上智大学' {...form.getInputProps('location')} />
            <DatePicker label='開始日' placeholder='Pick date' locale='ja' {...form.getInputProps('start_date')} />
            <DatePicker label='終了日' placeholder='Pick date' locale='ja' {...form.getInputProps('end_date')} />
            <Group position='right' mt='md'>
               <Button type='submit'>作成</Button>
            </Group>
         </form>
      </Box>
   )
}

export default UpdateCampModal
