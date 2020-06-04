a <- 1
b <- 1
c <- -1
a
b
c
print(a)
ls()
x
(-b + sqrt(b^2 - 4*a*c)/ (2*a))
(-b + sqrt(b^2 - 4*a*c))/ (2*a)
(-b + sqrt(b^2 + 4*a*c))/ (2*a)
(-b - sqrt(b^2 - 4*a*c))/ (2*a)
ls
ls()
log(8)
log(3)
log(a)
exp(1)
log(exp(1))
help(ls)
help('ls')
help(log)
?log
?exp
?sqrt
log(2, base=10)
log(2, base=exp(1))
log(2, base=2
)
log(2,3)
log(2,3=2)
log(2,2)
2^3

help("+")
?"+"
help("?")
data()
CO2
pi
Inf
Inf > 10
solution_2 <- (-b + sqrt(b^2 - 4*a*c))/ (2*a)
solution_1 <- (-b - sqrt(b^2 - 4*a*c))/ (2*a)
a <- 1
b <- 2
c <- 2
solution_2 <- (-b + sqrt(b^2 - 4*a*c))/ (2*a)
solution_1 <- (-b - sqrt(b^2 - 4*a*c))/ (2*a)
a <- 1
b <- 1
c <- -1
solution_2 <- (-b + sqrt(b^2 - 4*a*c))/ (2*a)
solution_1 <- (-b - sqrt(b^2 - 4*a*c))/ (2*a)
a <- 2
class(a)
class(ls)
class("a")
class("aaaaa")
library(dslabs)
data("numeric")
data("murders")
class(murders)
str(murders)
str("")
head(murders)
murders$population
murders$total
murders$region
length(murders$population)
pop <- murders$population
length(pop)
a <- 1
a
"a"
murders$state
class(murders$state)
TRUE
FALSE
z <- 3 == 2
z
class(z)
murders$region
class(murders$region)
data("murders")
class(murders$region)
a <- 2
b <- -1
c <- -4
## now compute the solution
solution_2 <- (-b + sqrt(b^2 - 4*a*c))/ (2*a)
solution_1 <- (-b - sqrt(b^2 - 4*a*c))/ (2*a)
solution_1
solution_2
log(1024, base=4)
data("movielens")
str(movielens)
class(movielens$title)
class(movielens$genres)
nlevels(movielens$genres)

?nlevels
codes <- c(380, 124, 818)
codes
country <- c("italy", "canada", "egypt")
codes
class(codes)
codes <- c(italy=380, canada=123, egypt=818)
code
codes
class(codes)
codes <- c("italy"=380, "canada"=123, "egypt"=818)
codes
names
country <- c("italy", "canada", "egypt")
codes <- c(380, 124, 818)
names(codes) <- country
codes
seq(1,10)
1:10
1:10:2
seq(1,10,2)
seq(1,10,3)
1:10
codes[2]
codes[c(1,3)]
codes[1:2]
codes[1:3]
codes["canada"]
codes["italy"]
codes[c("egypt", "italy")]
x <- c(1, "canada", 3)
x
class(x)
x <- as.character(x)
x
x <- 1:5
x
x <- as.character(x)
x
x <- as.character(x)
y <- as.character(x)
y
as.numeric(y)
z = as.numeric(y)
z
class(codes)
code
codes
1:10
seq(1,10)
1:10
1:10:1
codes[2]
codes[c("canda", "italy")]
codes[c("canada", "italy")]
codes[1:12]
codes[1:2]
codes["canada"]
codes["italy"]
codes[c("egypt", "italy")]
x <- c("1", "b", "3")
as.numeric(x)
TRUE == NA
TRUE == TRUE
sort(murders$total)
?order
x <- c(31, 4, 15, 92, 65)
x
x
sort(x)
order(x)
index <- order(x)
x[index]
order
idnex
index
1
order(murders$state)
order(murders$total)
murders$state[order(murders$total)]
max(murders$total)
which.max(murders$total)
murders$states(which.max(murders$total))
murders$states[which.max(murders$total)]
murders$states[which.max(murders$total)]
murders$state[which.max(murders$total)]
murders$state[which.min(murders$total)]
?rank
rank(murders$total)
x <- c(31, 4, 15, 92, 65)
x
rank(x)
murders$state[rank(x)]
x[rank(x)]
murders$state[which.max(murders$population)]
max(murders$population)
heights <- c(69, 62, 66, 70, 70, 73, 67, 73, 67, 30)
heights <- c(69, 62, 66, 70, 70, 73, 67, 73, 67, 70)
heights * 2.54
murder_rate <- murders$total / murders$population
murder_rate
which.max(murder_rate)
murders$state[9]
murder_rate <- murders$total / murders$population * 100000
murder_rate
which.max(murder_rate)
murders$state[9]
murders$state[order(murder_rate, decreasing = TRUE)]
murders$region
class(murders$region)
murders$region[0]
class(murders$region[0])
levels(class(murders$region[0]))
labels(class(murders$region[0]))
label(class(murders$region[0]))
labels(class(murders$region[0]))
levels(class(murders$region[0]))
x <- c(2, 43, 27, 96, 18)
sort(x)
order(x)
rank(x)
min(x)
which.min(x)
max(x)
which.maz(x)
which.maz(x)
which.max(x)
name <- c("Mandi", "Amy", "Nicole", "Olivia")
distance <- c(0.8, 3.1, 2.8, 4.0)
time <- c(10, 30, 40, 50)
time_hours <- time / 60
time_houes
time_hours
my_df = data.frame(title=name, time=time_hours)
my_df
speed = distance/time_hours
my_df = data.frame(title=name, time=time_hours, speed=speed)
my_df
max(my_df)
max(my_df$speed)
murder_rate
murder_rate > 10
murder_rate < 0.7
index <- murder_rate < 0.71
index
murders$state[index]
sum(index)
west <- murders$region == "West"
west
safe <- murder_rate <= 1
safe
index <- safe & west
index
murders$state[index]
x <- c(FALSE, TRUE, FALSE, TRUE, TRUE, FALSE)
x
which(x)
which(murders$state == "Massachusetts")
index <- which(murders$state == "Massachusetts")
index
murders$state == "Massachusetts"
index <- match(c("New York", "Florida", "Texas"), murders$state)
index
murders$state[index]
murder_rate[index]
x <- c("a", "b", "c", "d", "e")
y <- c("a", "d", "f")
x %in% y
y %in% x
c("Boston", "Dakota", "Washington") %in% murders$state
package.install(dplyr)
packages.install(dplyr)
install.packages("dplyr")
pack
library("dplyr")
library(dplyr)
murders
murder_rate
murders <- mutate(murders, rate=total/population*100000)
murders
str(murders)
murders$rate
head(murders)
filter(murders, rate <- 0.71)
filter(murders, rate <= 0.71)
new_table <- select(murders, state, region, rate)
new_table
filter(new_table, rate < 0.71)
murders %>% select(state, region, rate) %>% filter(rate < 0.71)
grades <- data.frame(names=c("John", "Juan", "Jean", "Yao"),)
grades <- data.frame(names=c("John", "Juan", "Jean", "Yao"),)
exam_1= c(95, 80, 90, 85)
exam_2= c(90, 85, 85, 90)
grades <- data.frame(names=c("John", "Juan", "Jean", "Yao"),
exam_1= c(95, 80, 90, 85),
exam_2= c(90, 85, 85, 90))
grades
grades$exam_1
class(grades$names)
grades <- data.frame(names=c("John", "Juan", "Jean", "Yao"),
exam_1= c(95, 80, 90, 85),
exam_2= c(90, 85, 85, 90),
stringsAsFactors = FALSE)
grades$exam_1
class(grades$names)
population_in_millions <- murders$population/10^6
total_gun_murders <- murders$total
plot(population_in_millions, total_gun_murders)
hist(murder_rate)
hist(murders$rate)
murders$state[which.max(murders$rate)]
boxplot(rate~region, data = murders)
library(dslabs)
data(heights)
options(digits = 3)
heights
sum(heights > mean(heights))
heights > mean(heights)
heights$height > mean(heights)
sum(heights$height > mean(heights))
sum(heights$height > mean(heights$height))
View(heights)
sum(heights$height > mean(heights$height) & heights$sex == "Female")
sum(heights$height > mean(heights$height) & heights$sex == "Female") / sum(heights$height > mean(heights$height))
heights$sex == "Female"
sum(heights$sex == "Female")
sum(heights$sex == "Female") / length(heights)
sum(heights$sex == "Female")
length(heights)
length(heights$height)
sum(heights$sex == "Female") / length(heights$sex)
mean(heights$sex == "Female")
min(heights$height)
?match
match(min(heights$height), heights$height)
heights$sex[match(min(heights$height), heights$height)]
heights$sex[1032]
heights$sex[1032]
heights$sex[1]
heights$sex[1032]
heights$sex
levels(heights$sex[1032])
heights$sex[1032]
heights$sex[match(min(heights$height), heights$height)]
max(heights$height)
min(heights$height)
x <- 50:82
x
sum(x %in% heights$height)
sum(! x %in% heights$height)
heights2 = mutate(heights, ht_cm=2.54*height)
head(heights2)
heights2$height[18]
heights2$ht_cm[18]
mean(heights$ht_cm)
mean(heights2$ht_cm)
females <- filter(heights2, sex=="Female")
head(females)
length(females)
str(females)
mean(females$ht_cm)
library(dslabs)
data(olive)
head(olive)
plot(olive$palmitic, olive$palmitoleic)
hist(olive$eicosenoic)
boxplot(palmitic~region, olive)
a <- c(1,2,3)
a
if(a!=0){
print(1/a)
} else {
print("No reciprocal for 0")
}
library(dslabs)
data(murders)
murder_rate
ind <- which.min(murder_rate)
if(murder_rate[ind] < 0.5) {
print(murders$state[ind])
} else {
print("No state has murder rate that low")
}
if(murder_rate[ind] < 2.5) {
print(murders$state[ind])
} else {
print("No state has murder rate that low")
}
if(murder_rate[ind] < 0.25) {
print(murders$state[ind])
} else {
print("No state has murder rate that low")
}
if(murder_rate[ind] < 25) {
print(murders$state[ind])
} else {
print("No state has murder rate that low")
}
a <- 0
ifelse(a > 0, 1/a, NA)
a <- 1
ifelse(a > 0, 1/a, NA)
a <- c(1,2,3,4,0,1)
ifelse(a > 0, 1/a, NA)
data("na_example")
sum(is_na(na_example))
sum(is.na(na_example))
no_nas <- ifelse(is.na(na_example), 0, na_example)
no_nas
sum(is.na(no_nas))
z <- c(TRUE, TRUE, FALSE)
any(z)
z <- c(FALSE, FALSE, FALSE)
any(z)
all(z)
z <- c(TRUE, TRUE, FALSE)
all(z)
z <- c(TRUE, TRUE, TRUE)
all(z)
avg <- function(x){
s <- sum(x)
n <- length(x)
s/n
}
avg(c(1,2,3))
avg(1:100)
identical(mean(x), avg(x))
avg <- function(x, arithmatic=TRUE) {
n <- length(x)
ifelse(arithmatic, sum(x)/n, prod(x)^(1/n))
}
avg(1:100)
avg(1:100, arithmatic = TRUE)
avg(1:100, arithmatic = FALSE)
compute_s_n <- function(n) {
x <- 1:n
sum(x)
}
compute_s_n(100)
for(i in 1:10){
print(i)
}
for(i in 1:10){
print(compute_s_n(i))
}
m <- 25
s_n <- vector(length = m)
for(n in 1:m){
s_n[n] <- compute_s_n(n)
}
s_n
n <- 1:m
plot(s, s_n)
plot(n, s_n)
plot(n, s_n)
lines(n, n*(n+1)/2)
ifelse(heights$sex == "Female", 1, 2)
sum(ifelse(heights$sex == "Female", 1, 2))
sum(ifelse(heights$height > 72, heights$height, 0))
mean(ifelse(heights$height > 72, heights$height, 0))
inches_to_ft <- function(inch) {
inch / 12
}
inches_to_ft(144)
which(heights$height, inches_to_ft(heights$height) < 5)
ifelse(inches_to_ft(heights$height) < 5, TRUE, FALSE)
sum(ifelse(inches_to_ft(heights$height) < 5, TRUE, FALSE))
savehistory(file="r-basic-harvardx")
savehistory(file="~/r-basic-harvardx")
