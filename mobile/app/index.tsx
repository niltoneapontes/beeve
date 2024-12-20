import React, { useContext, useEffect, useState } from "react";
import { ButtonContainer, Container, TextContainer } from "./styles/loginStyle";
import Title from "@/components/Title";
import { Image, Text, View } from "react-native";
import Background from "@/assets/images/background.png";
import Paragraph from "@/components/Paragraph";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useNavigation } from "expo-router";
import { api, handleRequestError } from "@/api";
import { AuthContext } from "@/context/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import LocalStorage from "@/utilities/localstorage";
import * as ConfigCat from "configcat-js";
import { showToast } from "@/utilities/toast";

const configCatClient = ConfigCat.getClient(
  "configcat-sdk-1/Of_cCLrpcUuFjcbMTxku1g/8bgId2wuH0qQw1W0by6Twg"
);

interface ILogin {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [isAppAvailable, setIsAppAvailable] = useState(true);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("Preencha o e-mail"),
    password: Yup.string().required("Preencha a senha"),
  });

  const getMainFeatureFlag = async () => {
    try {
      const flag = await configCatClient.getValueAsync("isAppAvailable", true);
      setIsAppAvailable(flag);
    } catch {
      showToast("error", "Oops...", "Tivemos um problema");
    }
  };

  const { user, login } = useContext(AuthContext);

  const onSignin = async ({ email, password }: ILogin) => {
    try {
      const response = await api.post("/users/login", {
        email: email,
        password: password,
      });

      const loggedUser = response.data;

      if (login) {
        login(loggedUser, loggedUser.access_token);
      }

      await LocalStorage.storeData("@eeve/user", JSON.stringify(loggedUser));

      navigation.navigate("(tabs)");
    } catch (error) {
      handleRequestError(error);
    }
  };

  useEffect(() => {
    getMainFeatureFlag();
  }, []);

  useEffect(() => {
    if (!isAppAvailable) {
      navigation.navigate("+not-found");
    } else if (user?.email) {
      navigation.navigate("(tabs)");
    }
  }, [user, isAppAvailable]);

  return (
      <Container>
        <Image
          source={Background}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "50%",
          }}
        />
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSignin(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <TextContainer>
              <Title
                content="Esse é o Beeve!"
                style={{ marginTop: 24, marginBottom: 8, fontSize: 32 }}
              />
              <Paragraph content="Descubra, avalie e compartilhe suas experiências com bebidas." />
              <View style={{ height: 8 }}></View>
              <Input
                label="E-mail"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                autoCapitalize="none"
                textContentType="emailAddress"
              ></Input>
              {errors.email && touched.email && (
                <Text style={{ color: "red", marginTop: -4, marginLeft: 2 }}>
                  {errors.email}
                </Text>
              )}
              <Input
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                textContentType="password"
                secureTextEntry
              ></Input>
              {errors.password && touched.password && (
                <Text style={{ color: "red", marginTop: -4, marginLeft: 2 }}>
                  {errors.password}
                </Text>
              )}
              <ButtonContainer>
                <Button
                  content="login"
                  type="primary"
                  style={{ width: "100%" }}
                  onPress={handleSubmit}
                />
                <Button
                  content="cadastro"
                  type="white"
                  style={{ width: "100%", marginTop: 8 }}
                  onPress={() => {
                    navigation.navigate("signup");
                  }}
                />
              </ButtonContainer>
            </TextContainer>
          )}
        </Formik>
      </Container>
  );
}
