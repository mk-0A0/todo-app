import * as React from "react"
import {useState} from "react"
import {Box, Button, ChakraProvider, Container, Flex, FormControl, Grid, Input, Text, theme} from "@chakra-ui/react"
import {uid} from "uid";

export const App = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState<{ name: string, isDone: boolean, uid: string }[]>([])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  const onClickAdd = () => {
    setTodos(prevState => [...prevState, {name: todo, isDone: false, uid: uid()}])
    setTodo('')
  }

  const onClickRemove = (uid: string) => {
    setTodos(prevState => prevState.filter(({uid: _uid}) => uid !== _uid))
  }

  const onCLickComplete = (uid: string) => {
    setTodos(prevState => prevState.map(({name, isDone, uid: _uid}) => {
      return {name, isDone: _uid === uid ? true : isDone, uid: _uid}
    }))
  }

  const onCLickBack = (uid: string) => {
    setTodos(prevState => prevState.map(({name, isDone, uid: _uid}) => {
      return {name, isDone: _uid === uid ? false : isDone, uid: _uid}
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
              {todos.filter(({isDone}) => !isDone).map(({name, isDone, uid}) => (
                <Flex key={`incomplete_${uid}`} borderBottomColor={'gray.200'} borderBottomWidth={1} pb={5}
                      justifyContent={"space-between"} alignItems={"center"}>
                  <Text>{name}</Text>
                  <Flex gap={5}>
                    <Button onClick={() => onCLickComplete(uid)}>完了</Button>
                    <Button onClick={() => onClickRemove(uid)}>削除</Button>
                  </Flex>
                </Flex>
              ))}
            </Grid>
          </Box>
          <Box bgColor={"green.50"} p={10}>
            <Text fontWeight={"bold"}>完了のTODO</Text>
            <Grid gap={5} mt={5}>
              {todos.filter(({isDone}) => isDone).map(({name, uid}) => (
                <Flex key={`complete_${uid}`} borderBottomColor={'gray.200'} borderBottomWidth={1} pb={5}
                      justifyContent={"space-between"} alignItems={"center"}>
                  <Text>{name}</Text>
                  <Button onClick={() => onCLickBack(uid)}>戻す</Button>
                </Flex>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </ChakraProvider>
  )
}
