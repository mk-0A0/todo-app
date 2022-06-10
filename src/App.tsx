import * as React from "react"
import {useState} from "react"
import {Box, Button, ChakraProvider, Container, Flex, FormControl, Grid, Input, Text, theme} from "@chakra-ui/react"
import {uid} from "uid";

export const App = () => {
  /**
   * - nameInput = 入力したテキスト
   */
  const [nameInput, setNameInput] = useState('')

  /**
   * - todos = 完了・未完了関係無くすべての要素が入る配列
   * - name = 入力したテキスト
   * - isDone = 完了したかどうか
   * - uid = uid
   */
  const [todos, setTodos] = useState<{ name: string, isDone: boolean, uid: string }[]>([])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value)
  }

  /**
   * TODOを追加する関数
   * - prevState = 現在のtodos
   * - prevStateを展開し、入力されたTODOを追加した新しい配列を生成
   * - name = 入力したテキスト
   * - isDone = 完了したかどうかの初期(未完了)
   * - uid = uidを生成する関数
   * - nameInputを初期化
   */
  const onClickAdd = () => {
    setTodos(prevState => [...prevState, {name: nameInput, isDone: false, uid: uid()}])
    setNameInput('')
  }

  /**
   * TODOを削除する関数
   * - 引数で受け取ったuidを持つTODOを削除
   * - prevStateをfilterにかける
   * - ループしている要素のuidと引数のuidを比較し、一致しない要素を抽出(TODO削除後の配列を作るため)
   * - 抽出した要素で新しい配列を生成
   * ※ 引数のuidとオブジェクトのプロパティのuidが重複するため、_を付けてリネーム
   */
  const onClickRemove = (uid: string) => {
    setTodos(prevState => prevState.filter(({uid: _uid}) => uid !== _uid))
  }

  /**
   * 引数で受け取ったuidを持つTODOを完了する関数
   * - prevState(すべての要素)をmapで回す
   * - プロパティを返す
   * - ループしている要素のuidと引数のuidが一致した場合、isDoneをtrueに上書き(TODOを完了させる)
   */
  const onCLickComplete = (uid: string) => {
    setTodos(prevState => prevState.map(({name, isDone, uid: _uid}) => {
      return {name, isDone: _uid === uid ? true : isDone, uid: _uid}
    }))
  }

  /**
   * 引数で受け取ったuidを持つTODOを戻す関数
   * - prevState(すべての要素)をmapで回す
   * - プロパティを返す
   * - ループしている要素のuidと引数で受け取ったuidが一致した場合、isDoneをfalseに上書き(TODOを戻す)
   */
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
              <Input type='text' placeholder={'TODOを入力'} value={nameInput} onChange={onChange}/>
            </FormControl>
            <Button onClick={onClickAdd}>追加</Button>
          </Flex>
          <Box bgColor={"blue.50"} p={10}>
            <Text fontWeight={"bold"}>未完了のTODO</Text>
            <Grid gap={5} mt={5}>
              {/* isDoneがfalseの要素をfilterで抽出 */}
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
              {/* isDoneがtrueの要素をfilterで抽出 */}
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
