import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function LoginPage() {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Login</CardTitle>
				</CardHeader>
				<CardContent>
					<form action={login} className="space-y-4">
						<Label htmlFor="email">Email:</Label>
						<Input id="email" name="email" type="email" required />
						<Label htmlFor="password">Password:</Label>
						<Input id="password" name="password" type="password" required />
						<Button type="submit">Login</Button>
					</form>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Sign up</CardTitle>
				</CardHeader>
				<CardContent>
					<form action={signup} className="space-y-4">
						<Label htmlFor="email">Email:</Label>
						<Input id="email" name="email" type="email" required />
						<Label htmlFor="password">Password:</Label>
						<Input id="password" name="password" type="password" required />
						<Button type="submit">Sign up</Button>
					</form>
				</CardContent>
			</Card>
		</>
	);
}
