import { useEffect, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Container } from "react-bootstrap";
import Navbar from "../../components/layout/nav/Navbar";
import { halamanGameVerifikasi, insertGameScore } from "../../action/games";
// https://react-unity-webgl.dev/
// https://github.com/jeffreylanters/react-unity-webgl/discussions/264

const GameSpaceWar = () => {
  // const [isLogin, setIsLogin] = useState(true);
  const game_id = "-NG-FxcdZAq13GcqcZIm";
  const uuid = localStorage.getItem("UID");
  const { unityProvider, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "/game/space_war/BinarSpaceWar.loader.js",
      dataUrl: "/game/space_war/BinarSpaceWar.data.unityweb",
      frameworkUrl: "/game/space_war/BinarSpaceWar.framework.js.unityweb",
      codeUrl: "/game/space_war/BinarSpaceWar.wasm.unityweb",
    });

  // sendMessage("JavascriptHook", "ChangeData", "HarlanSR");

    const handleGameOver = useCallback(( score ) => {
        insertGameScore(game_id, uuid, score);
    }, [uuid]);


    useEffect( () => {
        halamanGameVerifikasi()
    }, []);
  

    useEffect(() => {
        addEventListener("GameOver", handleGameOver);
        return () => {
            removeEventListener("GameOver", handleGameOver);
        };
    }, [addEventListener, removeEventListener, handleGameOver]);

    return (
        <div style={{ backgroundColor: '#2B2D33', color: '#fff', height:"100vh" }}>
            <Navbar bgColor="#4A4A5C"/>
            <Container className="mt-5" >

                <div className="p-5">
                    <Unity
                        style={{
                            width: "100%",
                            justifySelf: "center",
                            alignSelf: "center",
                        }}
                        unityProvider={unityProvider} />
                </div>
            </Container>
        </div>
  );
};

export default GameSpaceWar;
