import { Box, Group, TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import 'dayjs/locale/ja'
import { DatePicker } from '@mantine/dates'

const NewCamp = (props: any) => {
   const form = useForm({
      initialValues: {
         name: '',
         description: '',
         location: '',
         start_date: '',
         end_date: '',
      },

      validate: {
         name: (value) => (value.length < 2 ? '名前は二文字以上必要です' : null),
         start_date: (value) => (value.length !== undefined ? '開始日は必須です' : null),
         end_date: (value) => (value.length !== undefined ? '終了日は必須です' : null),
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

export default NewCamp
