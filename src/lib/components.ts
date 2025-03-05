import { BellRing, Check, ChevronDown, Minus, Plus, Send } from 'lucide-react';

import { cn } from '@/lib/utils';


import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { addDays } from 'date-fns';
import { Bar, BarChart, Line, LineChart } from 'recharts';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Icons } from '@/components/icons';

const CardStats = {
  initialCode: `
function CardsStats() {
  const data = [
    {
      revenue: 10400,
      subscription: 240,
    },
    {
      revenue: 14405,
      subscription: 300,
    },
    {
      revenue: 9400,
      subscription: 200,
    },
    {
      revenue: 8200,
      subscription: 278,
    },
    {
      revenue: 7000,
      subscription: 189,
    },
    {
      revenue: 9600,
      subscription: 239,
    },
    {
      revenue: 11244,
      subscription: 278,
    },
    {
      revenue: 26475,
      subscription: 189,
    },
  ];

  const chartConfig = {
    revenue: {
      label: 'Revenue',
      color: 'hsl(var(--primary))',
    },
    subscription: {
      label: 'Subscriptions',
      color: 'hsl(var(--primary))',
    },
  };
  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-2'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-normal'>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent className='pb-0'>
          <div className='text-2xl font-bold'>$15,231.89</div>
          <p className='text-xs text-muted-foreground'>
            +20.1% from last month
          </p>
          <ChartContainer config={chartConfig} className='h-[80px] w-full'>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Line
                type='monotone'
                strokeWidth={2}
                dataKey='revenue'
                stroke='var(--color-revenue)'
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-normal'>Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>+2350</div>
          <p className='text-xs text-muted-foreground'>
            +180.1% from last month
          </p>
          <ChartContainer config={chartConfig} className='mt-2 h-[80px] w-full'>
            <BarChart data={data}>
              <Bar
                dataKey='subscription'
                fill='var(--color-subscription)'
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

  `,
  scope: {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Bar,
    Line,
    LineChart,
    BarChart,
    ChartContainer,
  },
};
const CardsCalendar = {
  initialCode: `
  function CardsCalendar() {
  const start = new Date(2023, 5, 5);
    return (
      <Card className=''>
        <CardContent className='p-1 flex justify-center'>
          <Calendar
            numberOfMonths={1}
            mode='range'
            defaultMonth={start}
            selected={{
              from: start,
              to: addDays(start, 8),
            }}
          />
        </CardContent>
      </Card>
    );
  }
  `,
  scope: {
    Card,
    CardContent,
    Calendar,
    addDays,
  },
};

const CardsActivityGoa = {
  initialCode: `
  function CardsActivityGoal() {
  const [goal, setGoal] = React.useState(350);

  const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

const chartConfig = {
  goal: {
    label: 'Goal',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Card>
      <CardHeader className='pb-4'>
        <CardTitle>Move Goal</CardTitle>
        <CardDescription>Set your daily activity goal.</CardDescription>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='flex items-center justify-center space-x-2'>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8 shrink-0 rounded-full'
            onClick={() => onClick(-10)}
            disabled={goal <= 200}
          >
            <Minus />
            <span className='sr-only'>Decrease</span>
          </Button>
          <div className='flex-1 text-center'>
            <div className='text-5xl font-bold tracking-tighter'>{goal}</div>
            <div className='text-[0.70rem] uppercase text-muted-foreground'>
              Calories/day
            </div>
          </div>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8 shrink-0 rounded-full'
            onClick={() => onClick(10)}
            disabled={goal >= 400}
          >
            <Plus />
            <span className='sr-only'>Increase</span>
          </Button>
        </div>
        <div className='my-3 h-[60px]'>
          <ChartContainer
            config={chartConfig}
            className='aspect-auto h-full w-full'
          >
            <BarChart data={data}>
              <Bar dataKey='goal' radius={4} fill='var(--color-goal)' />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Set Goal</Button>
      </CardFooter>
    </Card>
  );
}
  `,
  scope: {
    Minus,
    Plus,
    Bar,
    BarChart,
    ChartContainer,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Button,
  },
};

const CardsMetric = {
  initialCode: `
  function CardsMetric() {
  const data = [
  {
    average: 400,
    today: 240,
  },
  {
    average: 300,
    today: 139,
  },
  {
    average: 200,
    today: 980,
  },
  {
    average: 278,
    today: 390,
  },
  {
    average: 189,
    today: 480,
  },
  {
    average: 239,
    today: 380,
  },
  {
    average: 349,
    today: 430,
  },
]

const chartConfig = {
  today: {
    label: "Today",
    color: "hsl(var(--primary))",
  },
  average: {
    label: "Average",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exercise Minutes</CardTitle>
        <CardDescription>
          Your exercise minutes are ahead of where you normally are.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer config={chartConfig} className="w-full md:h-[200px]">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="average"
              stroke="var(--color-average)"
              strokeOpacity={0.5}
              activeDot={{
                r: 6,
                fill: "var(--color-average)",
              }}
            />
            <Line
              type="monotone"
              dataKey="today"
              strokeWidth={2}
              stroke="var(--color-today)"
              activeDot={{
                r: 8,
                style: { fill: "var(--color-today)" },
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
  `,
  scope: {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Line,
    LineChart,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  },
};

const CardsTeamMembers = {
  initialCode: `
  function CardsTeamMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <div className='flex items-center justify-between space-x-4'>
          <div className='flex items-center space-x-4'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='/avatars/01.png' alt='Image' />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium leading-none'>Sofia Davis</p>
              <p className='text-sm text-muted-foreground'>m@example.com</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' size='sm' className='ml-auto'>
                Owner <ChevronDown className='text-muted-foreground' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0' align='end'>
              <Command>
                <CommandInput placeholder='Select new role...' />
                <CommandList>
                  <CommandEmpty>No roles found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Viewer</p>
                      <p className='text-sm text-muted-foreground'>
                        Can view and comment.
                      </p>
                    </CommandItem>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Developer</p>
                      <p className='text-sm text-muted-foreground'>
                        Can view, comment and edit.
                      </p>
                    </CommandItem>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Billing</p>
                      <p className='text-sm text-muted-foreground'>
                        Can view, comment and manage billing.
                      </p>
                    </CommandItem>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Owner</p>
                      <p className='text-sm text-muted-foreground'>
                        Admin-level access to all resources.
                      </p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex items-center justify-between space-x-4'>
          <div className='flex items-center space-x-4'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='/avatars/02.png' alt='Image' />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium leading-none'>Jackson Lee</p>
              <p className='text-sm text-muted-foreground'>p@example.com</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' size='sm' className='ml-auto'>
                Member <ChevronDown className='text-muted-foreground' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0' align='end'>
              <Command>
                <CommandInput placeholder='Select new role...' />
                <CommandList>
                  <CommandEmpty>No roles found.</CommandEmpty>
                  <CommandGroup className='p-1.5'>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Viewer</p>
                      <p className='text-sm text-muted-foreground'>
                        Can view and comment.
                      </p>
                    </CommandItem>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Developer</p>
                      <p className='text-sm text-muted-foreground'>
                        Can view, comment and edit.
                      </p>
                    </CommandItem>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Billing</p>
                      <p className='text-sm text-muted-foreground'>
                        Can view, comment and manage billing.
                      </p>
                    </CommandItem>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Owner</p>
                      <p className='text-sm text-muted-foreground'>
                        Admin-level access to all resources.
                      </p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex items-center justify-between space-x-4'>
          <div className='flex items-center space-x-4'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='/avatars/03.png' alt='Image' />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium leading-none'>
                Isabella Nguyen
              </p>
              <p className='text-sm text-muted-foreground'>i@example.com</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' size='sm' className='ml-auto'>
                Member <ChevronDown className='text-muted-foreground' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0' align='end'>
              <Command>
                <CommandInput placeholder='Select new role...' />
                <CommandList>
                  <CommandEmpty>No roles found.</CommandEmpty>
                  <CommandGroup className='p-1.5'>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Viewer</p>
                      <p className='text-sm text-muted-foreground'>
                        Can view and comment.
                      </p>
                    </CommandItem>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Developer</p>
                      <p className='text-sm text-muted-foreground'>
                        Can view, comment and edit.
                      </p>
                    </CommandItem>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Billing</p>
                      <p className='text-sm text-muted-foreground'>
                        Can view, comment and manage billing.
                      </p>
                    </CommandItem>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Owner</p>
                      <p className='text-sm text-muted-foreground'>
                        Admin-level access to all resources.
                      </p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
  `,
  scope: {
    ChevronDown,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Popover,
    PopoverContent,
    PopoverTrigger,
  },
};

const CardsCookieSettings = {
  initialCode: `
  function CardsCookieSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cookie Settings</CardTitle>
        <CardDescription>Manage your cookie settings here.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <div className='flex items-center justify-between space-x-4'>
          <Label htmlFor='necessary' className='flex flex-col space-y-1'>
            <span>Strictly Necessary</span>
            <span className='text-xs font-normal leading-snug text-muted-foreground'>
              These cookies are essential in order to use the website and use
              its features.
            </span>
          </Label>
          <Switch id='necessary' defaultChecked aria-label='Necessary' />
        </div>
        <div className='flex items-center justify-between space-x-4'>
          <Label htmlFor='functional' className='flex flex-col space-y-1'>
            <span>Functional Cookies</span>
            <span className='text-xs font-normal leading-snug text-muted-foreground'>
              These cookies allow the website to provide personalized
              functionality.
            </span>
          </Label>
          <Switch id='functional' aria-label='Functional' />
        </div>
        <div className='flex items-center justify-between space-x-4'>
          <Label htmlFor='performance' className='flex flex-col space-y-1'>
            <span>Performance Cookies</span>
            <span className='text-xs font-normal leading-snug text-muted-foreground'>
              These cookies help to improve the performance of the website.
            </span>
          </Label>
          <Switch id='performance' aria-label='Performance' />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant='outline' className='w-full'>
          Save preferences
        </Button>
      </CardFooter>
    </Card>
  );
}
`,
  scope: {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Label,
    Switch,
  },
};

const CardsPaymentMethod = {
  initialCode: `
  function CardsPaymentMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <RadioGroup defaultValue='card' className='grid grid-cols-3 gap-4'>
          <div>
            <RadioGroupItem
              value='card'
              id='card'
              className='peer sr-only'
              aria-label='Card'
            />
            <Label
              htmlFor='card'
              className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='mb-3 h-6 w-6'
              >
                <rect width='20' height='14' x='2' y='5' rx='2' />
                <path d='M2 10h20' />
              </svg>
              Card
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value='paypal'
              id='paypal'
              className='peer sr-only'
              aria-label='Paypal'
            />
            <Label
              htmlFor='paypal'
              className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
            >
              <Icons.paypal className='mb-3 h-6 w-6' />
              Paypal
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value='apple'
              id='apple'
              className='peer sr-only'
              aria-label='Apple'
            />
            <Label
              htmlFor='apple'
              className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary '
            >
              <Icons.apple className='mb-3 h-6 w-6' />
              Apple
            </Label>
          </div>
        </RadioGroup>
        <div className='grid gap-2'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' placeholder='First Last' />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='city'>City</Label>
          <Input id='city' placeholder='' />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='number'>Card number</Label>
          <Input id='number' placeholder='' />
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='month'>Expires</Label>
            <Select>
              <SelectTrigger id='month' aria-label='Month'>
                <SelectValue placeholder='Month' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>January</SelectItem>
                <SelectItem value='2'>February</SelectItem>
                <SelectItem value='3'>March</SelectItem>
                <SelectItem value='4'>April</SelectItem>
                <SelectItem value='5'>May</SelectItem>
                <SelectItem value='6'>June</SelectItem>
                <SelectItem value='7'>July</SelectItem>
                <SelectItem value='8'>August</SelectItem>
                <SelectItem value='9'>September</SelectItem>
                <SelectItem value='10'>October</SelectItem>
                <SelectItem value='11'>November</SelectItem>
                <SelectItem value='12'>December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='year'>Year</Label>
            <Select>
              <SelectTrigger id='year' aria-label='Year'>
                <SelectValue placeholder='Year' />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i} >
                    {new Date().getFullYear() + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='cvc'>CVC</Label>
            <Input id='cvc' placeholder='CVC' />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Continue</Button>
      </CardFooter>
    </Card>
  );
}
  `,
  scope: {
    Icons,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Label,
    RadioGroup,
    RadioGroupItem,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  },
};

const CardsChat = {
  initialCode: `
   function CardsChat() {
   const users = [
  {
    name: 'Olivia Martin',
    email: 'm@example.com',
    avatar: '/avatars/01.png',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: '/avatars/03.png',
  },
  {
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: '/avatars/05.png',
  },
  {
    name: 'Jackson Lee',
    email: 'lee@example.com',
    avatar: '/avatars/02.png',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    avatar: '/avatars/04.png',
  },
] as const;
  const [open, setOpen] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);

  const [messages, setMessages] = React.useState([
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: 'agent',
      content: 'What seems to be the problem?',
    },
    {
      role: 'user',
      content: "I can't log in.",
    },
  ]);
  const [input, setInput] = React.useState('');
  const inputLength = input.trim().length;

  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center'>
          <div className='flex items-center space-x-4'>
            <Avatar>
              <AvatarImage src='/avatars/01.png' alt='Image' />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium leading-none'>Sofia Davis</p>
              <p className='text-sm text-muted-foreground'>m@example.com</p>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size='icon'
                  variant='outline'
                  className='ml-auto rounded-full'
                  onClick={() => setOpen(true)}
                >
                  <Plus />
                  <span className='sr-only'>New message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.role === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              setMessages([
                ...messages,
                {
                  role: 'user',
                  content: input,
                },
              ]);
              setInput('');
            }}
            className='flex w-full items-center space-x-2'
          >
            <Input
              id='message'
              placeholder='Type your message...'
              className='flex-1'
              autoComplete='off'
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type='submit' size='icon' disabled={inputLength === 0}>
              <Send />
              <span className='sr-only'>Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='gap-0 p-0 outline-none'>
          <DialogHeader className='px-4 pb-4 pt-5'>
            <DialogTitle>New message</DialogTitle>
            <DialogDescription>
              Invite a user to this thread. This will create a new group
              message.
            </DialogDescription>
          </DialogHeader>
          <Command className='overflow-hidden rounded-t-none border-t bg-transparent'>
            <CommandInput placeholder='Search user...' />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className='p-2'>
                {users.map((user) => (
                  <CommandItem
                    key={user.email}
                    className='flex items-center px-2'
                    onSelect={() => {
                      if (selectedUsers.includes(user)) {
                        return setSelectedUsers(
                          selectedUsers.filter(
                            (selectedUser) => selectedUser !== user
                          )
                        );
                      }

                      return setSelectedUsers(
                        [...users].filter((u) =>
                          [...selectedUsers, user].includes(u)
                        )
                      );
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt='Image' />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className='ml-2'>
                      <p className='text-sm font-medium leading-none'>
                        {user.name}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {user.email}
                      </p>
                    </div>
                    {selectedUsers.includes(user) ? (
                      <Check className='ml-auto flex h-5 w-5 text-primary' />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className='flex items-center border-t p-4 sm:justify-between'>
            {selectedUsers.length > 0 ? (
              <div className='flex -space-x-2 overflow-hidden'>
                {selectedUsers.map((user) => (
                  <Avatar
                    key={user.email}
                    className='inline-block border-2 border-background'
                  >
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className='text-sm text-muted-foreground'>
                Select users to add to this thread.
              </p>
            )}
            <Button
              disabled={selectedUsers.length < 2}
              onClick={() => {
                setOpen(false);
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
`,
  scope: {
    Check,
    Plus,
    Send,
    cn,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Input,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  },
};

const CardsCreateAccount = {
  initialCode: `
  function CardsCreateAccount() {
  return (
    <Card>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='grid grid-cols-2 gap-6'>
          <Button variant='outline'>
            <Icons.gitHub />
            GitHub
          </Button>
          <Button variant='outline'>
            <Icons.google />
            Google
          </Button>
        </div>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-card px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type='email' placeholder='m@example.com' />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' type='password' />
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Create account</Button>
      </CardFooter>
    </Card>
  );
}

  `,
  scope: {
    Icons,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Label,
  },
};

const CardsDataTable = {
  initialCode: `
    function CardsDataTable() {
    const data: Payment[] = [
      {
        id: 'm5gr84i9',
        amount: 316,
        status: 'success',
        email: 'ken99@yahoo.com',
      },
      {
        id: '3u1reuv4',
        amount: 242,
        status: 'success',
        email: 'Abe45@gmail.com',
      },
      {
        id: 'derv1ws0',
        amount: 837,
        status: 'processing',
        email: 'Monserrat44@gmail.com',
      },
      {
        id: 'bhqecj4p',
        amount: 721,
        status: 'failed',
        email: 'carmella@hotmail.com',
      },
    ];

const columns: ColumnDef<Payment>[] = [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label='Select all'
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue('status')}</div>
        ),
      },
      {
        accessorKey: 'email',
        header: ({ column }) => {
          return (
            <Button
              variant='ghost'
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Email
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
      },
      {
        accessorKey: 'amount',
        header: () => <div className='text-right'>Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue('amount'));
    
          // Format the amount as a dollar amount
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(amount);
    
          return <div className='text-right font-medium'>{formatted}</div>;
        },
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const payment = row.original;
    
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Payments</CardTitle>
        <CardDescription>Manage your payments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='mb-4 flex items-center gap-4'>
          <Input
            placeholder='Filter emails...'
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className='[&:has([role=checkbox])]:pl-3'
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className='[&:has([role=checkbox])]:pl-3'
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-end space-x-2 pt-4'>
          <div className='flex-1 text-sm text-muted-foreground'>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className='space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

    `,
  scope: {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ArrowUpDown,
    ChevronDown,
    MoreHorizontal,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Checkbox,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  },
};
export const components = [
  {
    initialCode: `
function CardWithForm() {
  return (
    <Card className="border-none rounded-md w-full h-full">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}`,
    scope: {
      Button,
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
      Input,
      Label,
    },
  },
  CardStats,
  CardsCalendar,
  CardsActivityGoa,
  CardsMetric,
  CardsTeamMembers,
  CardsCookieSettings,
  CardsChat,
  CardsCreateAccount,
  {
    initialCode: `
function CardDemo({ className, ...props }) {
const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]
  return (
    <Card className={cn("w-full border-none", className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  )
}
`,
    scope: {
      BellRing,
      Check,
      Button,
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
      Switch,
      cn,
    },
  },
  CardsPaymentMethod,
];
