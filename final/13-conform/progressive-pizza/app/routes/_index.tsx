import { redirect, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { ChangeEvent, useState } from "react";
import { PizzaPreview } from "~/components/PizzaPreview";
import { Button } from "~/components/ui/Button";
import { Checkbox } from "~/components/ui/Checkbox";
import { Flex } from "~/components/ui/Flex";
import { Grid } from "~/components/ui/Grid";
import { Layout } from "~/components/ui/Layout";
import { Radio } from "~/components/ui/Radio";
import { Text } from "~/components/ui/Text";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

let nextOrderId = 0;

type FormErrorObject = { size?: string; firstname?: string; lastname?: string; email?: string; phone?: string };

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const size = form.get("size");
  const toppings = form.getAll("toppings");
  const firstname = form.get("firstname");
  const lastname = form.get("lastname");
  const email = form.get("email");
  const phone = form.get("phone");

  let errors: FormErrorObject = {};

  // form validation
  if (!size) {
    errors = { ...errors, size: "Veuillez selectionnez la taille de votre pizza" };
  }
  if (firstname === "") {
    errors = { ...errors, firstname: "Veuillez entrer votre prénom" };
  } else if (firstname !== null && typeof firstname === "string") {
    if (firstname.length < 2) {
      errors = { ...errors, firstname: "Votre prénom doit contenir au moins 2 caractères" };
    }
  }

  if (lastname === "") {
    errors = { ...errors, lastname: "Veuillez entrer votre nom" };
  } else if (lastname !== null && typeof lastname === "string") {
    if (lastname.length < 2) {
      errors = { ...errors, lastname: "Votre nom doit contenir au moins 2 caractères" };
    }
  }
  if (email === "") {
    errors = { ...errors, email: "Veuillez entrer votre email" };
  } else if (email !== null && typeof email === "string") {
    if (email.endsWith("@example.com")) {
      errors = { ...errors, email: "Veuillez entrer une adresse email valide" };
    }
  }
  if (phone === "") {
    errors = { ...errors, phone: "Veuillez entrer votre numéro de téléphone" };
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const orderId = nextOrderId++;
  console.log(
    `[order #${orderId}] Ordering a ${size} pizza` +
      (toppings.length > 0 ? ` with ${toppings.join(", ")} for ${firstname} ${lastname} at ${email} / ${phone}!` : "")
  );

  return redirect(`/confirmation?orderId=${orderId}`);
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  // Add state management for the pizza preview
  const [toppings, setToppings] = useState<string[]>([]);

  const handleFormChange = (event: ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const toppings = formData.getAll("toppings") as string[];
    setToppings(toppings);
  };

  const inputClasses =
    "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none  invalid:border-pink-500 invalid:text-pink-600      focus:invalid:border-pink-500 focus:invalid:ring-pink-500";

  return (
    <Layout
      bottomSheet={
        <Button form="pizza-form" type="submit" fullWidth>
          Commander
        </Button>
      }
    >
      <Text className="mb-4" as="h2" size="2xl" weight="bold">
        Remixez votre pizza
      </Text>

      {/* Use the state in the preview component */}
      <PizzaPreview toppings={toppings} />

      <Form
        id="pizza-form"
        method="POST"
        action="?index"
        onChange={handleFormChange} // update the pizza preview on every form change
      >
        <fieldset className="my-4">
          <Text className="mb-4" as="legend" size="lg" weight="bold">
            Selectionnez la taille
          </Text>

          <Flex>
            <Radio type="radio" name="size" value="small" imageUrl="/sizes/small.svg">
              Small
            </Radio>

            <Radio type="radio" name="size" value="medium" imageUrl="/sizes/medium.svg">
              Medium
            </Radio>

            <Radio type="radio" name="size" value="large" imageUrl="/sizes/large.svg">
              Large
            </Radio>
          </Flex>

          {actionData?.errors?.size && (
            <Text size="sm" color="danger">
              <em>{actionData?.errors?.size}</em>
            </Text>
          )}
        </fieldset>

        <fieldset className="my-4">
          <Text className="mb-4" as="legend" size="lg" weight="bold">
            Choisissez votre garniture
          </Text>

          <Grid>
            <Checkbox name="toppings" value="anchovy" imageUrl="/toppings/anchovy.svg">
              Anchois
            </Checkbox>

            <Checkbox name="toppings" value="bacon" imageUrl="/toppings/bacon.svg">
              Bacon
            </Checkbox>

            <Checkbox name="toppings" value="basil" imageUrl="/toppings/basil.svg">
              Basilic
            </Checkbox>

            <Checkbox name="toppings" value="chili" imageUrl="/toppings/chili.svg">
              Piment
            </Checkbox>

            <Checkbox name="toppings" value="mozzarella" imageUrl="/toppings/mozzarella.svg">
              Mozzarella
            </Checkbox>

            <Checkbox name="toppings" value="mushroom" imageUrl="/toppings/mushroom.svg">
              Champignon
            </Checkbox>

            <Checkbox name="toppings" value="olive" imageUrl="/toppings/olive.svg">
              Olive
            </Checkbox>

            <Checkbox name="toppings" value="onion" imageUrl="/toppings/onion.svg">
              Oignon
            </Checkbox>

            <Checkbox name="toppings" value="pepper" imageUrl="/toppings/pepper.svg">
              Poivre
            </Checkbox>

            <Checkbox name="toppings" value="pepperoni" imageUrl="/toppings/pepperoni.svg">
              Pepperoni
            </Checkbox>

            <Checkbox name="toppings" value="sweetcorn" imageUrl="/toppings/sweetcorn.svg">
              Maïs
            </Checkbox>

            <Checkbox name="toppings" value="tomato" imageUrl="/toppings/tomato.svg">
              Tomate
            </Checkbox>
          </Grid>
        </fieldset>

        <fieldset className="my-4">
          <Text className="mb-4" as="legend" size="lg" weight="bold">
            Vos coordonnées
          </Text>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname">
                <span className="block text-sm font-medium text-slate-700">Prénom</span>
              </label>
              <input id="firstname" type="text" name="firstname" className={inputClasses} />
              {actionData?.errors?.firstname && (
                <Text size="sm" color="danger">
                  <em>{actionData?.errors?.firstname}</em>
                </Text>
              )}
            </div>
            <div>
              <label htmlFor="lastname">
                <span className="block text-sm font-medium text-slate-700">Nom</span>
              </label>
              <input id="lastname" type="text" name="lastname" className={inputClasses} />
              {actionData?.errors?.lastname && (
                <Text size="sm" color="danger">
                  <em>{actionData?.errors?.lastname}</em>
                </Text>
              )}
            </div>
            <div>
              <label htmlFor="email">
                <span className="block text-sm font-medium text-slate-700">Email</span>
              </label>
              <input id="email" type="email" name="email" className={inputClasses} />
              {actionData?.errors?.email && (
                <Text size="sm" color="danger">
                  <em>{actionData?.errors?.email}</em>
                </Text>
              )}
            </div>
            <div>
              <label htmlFor="phone">
                <span className="block text-sm font-medium text-slate-700">Téléphone</span>
              </label>
              <input id="phone" type="tel" name="phone" className={inputClasses} />
              {actionData?.errors?.phone && (
                <Text size="sm" color="danger">
                  <em>{actionData?.errors?.phone}</em>
                </Text>
              )}
            </div>
          </div>
        </fieldset>
        <Button className="hidden md:inline-block" type="submit">
          Commander
        </Button>
      </Form>
    </Layout>
  );
}
