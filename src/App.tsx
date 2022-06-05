import * as React from "react"
import {useState} from "react"
import {Box, Button, ChakraProvider, Container, Flex, FormControl, Grid, Input, Text, theme} from "@chakra-ui/react"

export const App = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState<{ name: string, isDone: boolean }[]>([])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  const onClickAdd = () => {
    setTodos(prevState => [...prevState, {name: todo, isDone: false}])
    setTodo('')
  }

  const onClickRemove = (index: number) => {
    setTodos(prevState => prevState.filter((_, i) => i !== index))
  }

  const onCLickComplete = (index: number) => {
    setTodos(prevState => prevState.map(({name, isDone}, i) => {
      return {name, isDone: i === index ? true : isDone}
    }))
  }

  const onCLickBack = (index: number) => {
    setTodos(prevState => prevState.map(({name, isDone}, i) => {
      return {name, isDone: i === index ? false : isDone}
    }))
  }

  return (
    <ChakraProvider theme={theme}>
      <Container py={20}>
        <Grid gap={10}>
          <Flex gap={5}>
            <FormControl>
              <Input type='text' placeholder={'TODOを入力'} value={todo} onChange={onChange}/>
            </FormControl>
            <Button onClick={onClickAdd}>追加</Button>
          </Flex>
          <Box bgColor={"blue.50"} p={10}>
            <Text fontWeight={"bold"}>未完了のTODO</Text>
            <Grid gap={5} mt={5}>
              {todos.filter(({isDone}) => !isDone).map(({name, isDone}, index) => (
                <Flex key={`incomplete_${index}`} borderBottomColor={'gray.200'} borderBottomWidth={1} pb={5}
                      justifyContent={"space-between"} alignItems={"center"}>
                  <Text>{name}</Text>
                  <Flex gap={5}>
                    <Button onClick={() => onCLickComplete(index)}>完了</Button>
                    <Button onClick={() => onClickRemove(index)}>削除</Button>
                  </Flex>
                </Flex>
              ))}
            </Grid>
          </Box>
          <Box bgColor={"green.50"} p={10}>
            <Text fontWeight={"bold"}>完了のTODO</Text>
            <Grid gap={5} mt={5}>
              {todos.filter(({isDone}) => isDone).map(({name}, index) => (
                <Flex key={`complete_${index}`} borderBottomColor={'gray.200'} borderBottomWidth={1} pb={5}
                      justifyContent={"space-between"} alignItems={"center"}>
                  <Text>{name}</Text>
                  <Button onClick={() => onCLickBack(index)}>戻す</Button>
                </Flex>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </ChakraProvider>
  )
}
