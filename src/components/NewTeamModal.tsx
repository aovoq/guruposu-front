import { Box, Group, TextInput, Select, Radio, Button } from '@mantine/core'
import { useForm } from '@mantine/form'

const NewTeamModal = (props: any) => {
   const form = useForm({
      initialValues: {
         alphabet: '',
         name: '',
         description: '',
         color: '',
      },

      validate: {
         alphabet: (value) => (value === '' ? 'アルファベットは必須です' : null),
         name: (value) => (value.length < 2 ? '名前は二文字以上必要です' : null),
      },
   })

   const start = 'a'.charCodeAt(0)
   const alphabets = Array.apply(null, new Array(26)).map((v, i) => {
      return String.fromCharCode(start + i)
   }, {})

   return (
      <Box>
         <form onSubmit={form.onSubmit((values: any) => props.submit(values))}>
            <Select
               label='チームアルファベット'
               placeholder='選択してください'
               data={alphabets}
               withAsterisk
               {...form.getInputProps('alphabet')}
            />
            <TextInput label='チーム名' placeholder='例: Xチーム' withAsterisk {...form.getInputProps('name')} />
            <TextInput label='備考' withAsterisk {...form.getInputProps('description')}/>
            <Radio.Group label='テーブルカラー' withAsterisk {...form.getInputProps('color')}>
               <Radio value='pink' label='Pink' />
               <Radio value='blue' label='Blue' />
               <Radio value='yellow' label='Yellow' />
               <Radio value='orange' label='Orange' />
               <Radio value='green' label='Green' />
            </Radio.Group>
            <Group position='right' mt='md'>
               <Button type='submit'>作成</Button>
            </Group>
         </form>
      </Box>
   )
}

export default NewTeamModal
