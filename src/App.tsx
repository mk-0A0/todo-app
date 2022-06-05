import * as React from "react"
import {useState} from "react"
import {Box, Button, ChakraProvider, Container, Flex, FormControl, Grid, Input, Text, theme} from "@chakra-ui/react"

export const App = () => {
  const [incompleteTodos, setIncompleteTodos] = useState<string[]>([])
  const [completeTodos, setCompleteTodos] = useState<string[]>([])
  const [todo, setTodo] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  const onClickAdd = () => {
    setIncompleteTodos(prevState => [...prevState, todo])
    setTodo('')
  }

  const onClickRemove = (index: number) => {
    setIncompleteTodos(prevState => prevState.filter((_, i) => i !== index))
  }

  const onCLickComplete = (index: number) => {
    setIncompleteTodos(prevState => prevState.filter((_, i) => i !== index))
    setCompleteTodos(prevState => [...prevState, incompleteTodos[index]])
  }

  const onCLickBack = (index: number) => {
    setCompleteTodos(prevState => prevState.filter((_, i) => i !== index))
    setIncompleteTodos(prevState => [...prevState, completeTodos[index]])
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
              {incompleteTodos.map((todo, index) => (
                <Flex key={`incomplete_${index}`} borderBottomColor={'gray.200'} borderBottomWidth={1} pb={5}
                      justifyContent={"space-between"} alignItems={"center"}>
                  <Text>{todo}</Text>
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
              {completeTodos.map((todo, index) => (
                <Flex key={`complete_${index}`} borderBottomColor={'gray.200'} borderBottomWidth={1} pb={5}
                      justifyContent={"space-between"} alignItems={"center"}>
                  <Text>{todo}</Text>
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
