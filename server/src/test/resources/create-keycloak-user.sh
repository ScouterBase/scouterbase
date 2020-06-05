#!/usr/bin/env bash
ls -ll
cd /opt/jboss/keycloak/bin

./kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user admin --password password
USERID=$(./kcadm.sh create users -r Scouterbase -s username=ScouterbaseAdmin -s enabled=true -o --fields id | awk  'BEGIN{FS="\""}{print $4}' | sed ':a;N;$!ba;s/\n//g')

./kcadm.sh  update users/$USERID/reset-password -r Scouterbase -s type=password -s value=ScouterbaseAdmin -s temporary=false -n
./kcadm.sh add-roles --uusername scouterbaseadmin --cclientid realm-management --rolename realm-admin -r Scouterbase
